import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './Screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './navigation';

const App = () => {
  return (
    // <View style={{backgroundColor: 'white', height: '100%'}}>
    //   <Home />
    // </View>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
