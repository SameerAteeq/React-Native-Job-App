import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import styles from './tabs.style'

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
     <FlatList
      data={tabs}
      renderItem={({item})=>(
        <TouchableOpacity style={styles.btn(item,activeTab)} onPress={()=>setActiveTab(item)}>
          <Text style={styles.btnText(item,activeTab)}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item=>item}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{columnGap:10}}
     />
    </View>
  )
}

export default Tabs