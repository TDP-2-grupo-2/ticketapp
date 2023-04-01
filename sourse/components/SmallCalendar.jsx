import React from 'react'
import { Text, View } from 'react-native'

export const SmallCalendar = (date) => {
  return (
    <View style={[date.style,{borderRadius:15, backgroundColor: '#CCFFFFFF',height:60   ,width:60,alignContent:'center',alignItems:'center'}]}>
        <Text style={{color:'#000000', opacity:50,marginTop:5,fontSize:15}}>{date.month}</Text>
        <Text style={{color:'#000000', fontSize:26}}>{date.date}</Text>
    </View>
  )
}
