import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useFetch from '../hook/useFetch';
import {NearbyJobCard, ScreenHeaderBtn} from '../components';
import {COLORS, SIZES, icons} from '../constants';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/search';

const Search = ({route}) => {
  const navigation = useNavigation();
  const {searchTerm} = route.params;
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
  const query = {
    query: searchTerm,
    page: page.toString(),
  };
  const {data, loading, refetch, error} = useFetch('search', query);
  console.log('Search data', data);
  const handlePagination = direction => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      refetch();
    } else if (direction === 'right') {
      setPage(page + 1);
      refetch();
    }
  };
  const handlePress = jobId => {
    navigation.navigate('JobDetail', {jobId});
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <View style={{padding: SIZES.medium}}>
        <ScreenHeaderBtn
          iconUrl={icons.left}
          dimension={'60%'}
          handlePress={() => navigation.goBack()}
        />
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <NearbyJobCard
            item={item}
            handlePress={() => handlePress(item?.job_id)}
          />
        )}
        keyExtractor={item => item?.job_id}
        contentContainerStyle={{padding: SIZES.medium, rowGap: SIZES.medium}}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{searchTerm}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {loading ? (
                <ActivityIndicator size={'large'} color={COLORS.primary} />
              ) : error ? (
                <Text style={{color: COLORS.text}}>
                  Oopss Somthing went wrong..!
                </Text>
              ) : null}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <>
            {data.length > 0 && (
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  style={styles.paginationButton}
                  onPress={() => handlePagination('left')}>
                  <Image
                    source={icons.chevronLeft}
                    style={styles.paginationImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View style={styles.paginationTextBox}>
                  <Text style={styles.paginationText}>{page}</Text>
                </View>
                <TouchableOpacity
                  style={styles.paginationButton}
                  onPress={() => handlePagination('right')}>
                  <Image
                    source={icons.chevronRight}
                    style={styles.paginationImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
