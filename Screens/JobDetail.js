import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useFetch from '../hook/useFetch';
import {COLORS, SIZES, icons} from '../constants';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import {useNavigation} from '@react-navigation/native';
import Company from '../components/jobdetails/company/Company';
import {JobAbout, JobFooter, JobTabs, Specifics} from '../components';

const tabs = ['About', 'Qualifications', 'Responsibilities'];
const JobDetail = ({route}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState();
  const onRefresh = () => {};
  const navigation = useNavigation();
  const {jobId} = route.params;
  const {data, loading, error} = useFetch('job-details', {
    job_id: jobId,
  });

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        );
      case 'About':
        return (
          <JobAbout info={data[0]?.job_description ?? 'No data Provided'} />
        );
      case 'Responsibilities':
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        );
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: SIZES.medium,
        }}>
        <ScreenHeaderBtn
          iconUrl={icons.left}
          dimension="60%"
          handlePress={() => navigation.goBack()}
        />
        <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : error ? (
          <Text style={{color: 'black'}}>Something went wrong</Text>
        ) : data?.length === 0 ? (
          <Text style={{color: COLORS.primary}}>No data</Text>
        ) : (
          <View style={{padding: SIZES.medium, paddingBottom: 100}}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter
        url={
          data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'
        }
      />
    </SafeAreaView>
  );
};

export default JobDetail;

const styles = StyleSheet.create({});
