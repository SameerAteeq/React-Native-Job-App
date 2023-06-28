import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import styles from './welcome.style'
import { COLORS, SIZES, icons } from '../../../constants'
import { useNavigation } from '@react-navigation/native';

const jobTypes = ["Full-time", "Part-time", "Contractor"];
const Welcome = ({searchTerm,setSearchTerm, handleNavigate}) => {
  const navigation = useNavigation()
  const[activeJob,setActiveJob]= useState("Full-time")

  const handlePress =(item)=>{
    setActiveJob(item)
    navigation.navigate("Search",{item})
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Sameer</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder='What are you looking for?'
            value={searchTerm}
            onChangeText={(text)=>setSearchTerm(text)}
            placeholderTextColor={"#83829A"}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleNavigate}>
          <Image
          source={icons.search}
          resizeMode='contain'
          style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
          <FlatList
          data={jobTypes}
          renderItem={({item})=>(
            <TouchableOpacity style={styles.tab(activeJob,item)} onPress={()=>handlePress(item)} >
              <Text style={styles.tabText(activeJob,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item=>item}
          contentContainerStyle={{columnGap:SIZES.medium}}
          horizontal
          />
      </View>
    </View>
  )
}

export default Welcome