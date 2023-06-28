import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';
import { useNavigation } from '@react-navigation/native';

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState()
  const navigation = useNavigation()
  const { data, loading, error } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });
 console.log("data", data)

  const handlePress =(jobId)=>{
    navigation.navigate("JobDetail",{jobId})
    setSelectedJob(jobId)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View>
        {loading? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ):error? (
          <Text style={{color:"black"}}>Something went wrong</Text>
        ):(
          <FlatList
            data={data}
            renderItem={({item})=>(
              <PopularJobCard item={item} selectedJob={selectedJob}  handlePress={()=>handlePress(item?.job_id)}/>
            )}
            keyExtractor={item=>item?.job_id}
            contentContainerStyle={{rowGap:SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs