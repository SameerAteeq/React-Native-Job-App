import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, icons} from '../constants';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import Welcome from '../components/home/welcome/Welcome';
import Popularjobs from '../components/home/popular/Popularjobs';
import Nearbyjobs from '../components/home/nearby/Nearbyjobs';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (searchTerm) {
      navigation.navigate('Search', {searchTerm});
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.lightWhite, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: SIZES.medium,
        }}>
        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, padding: SIZES.medium}}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleNavigate={handleNavigate}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
