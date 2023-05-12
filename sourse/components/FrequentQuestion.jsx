import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'

export const FrequentQuestion = (question) => {
  return (
    <View style={{borderRadius:30}}>
        <Text style={{textAlign:'left',color:Colors.WHITE,marginVertical:10}}>{question.question}</Text>
        <Text style={{marginLeft:'10%',textAlign:'left', color:Colors.TEXT_SEC}}>{question.answer}</Text>
    </View>
  )
}
