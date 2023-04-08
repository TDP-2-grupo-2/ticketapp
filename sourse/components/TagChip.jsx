import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'

export const TagChip = (tag) => {
  return (
    <View style={{backgroundColor:Colors.SOMBREADO, borderRadius:10}}>
        <Text>{tag}</Text>
    </View>
  )
}
