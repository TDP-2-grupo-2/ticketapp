import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'

export const FrequentQuestion = ({question}) => {
  return (
    <View style={{borderRadius:30}}>
        <Text style={{textAlign:'left'}}>{question.question}</Text>
        <Text style={{textAlign:'right', color:Colors.TEXT_SEC}}>{question.answer}</Text>
    </View>
  )
}
