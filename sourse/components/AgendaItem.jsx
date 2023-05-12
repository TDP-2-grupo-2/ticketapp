import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'

export const AgendaItem = (agendaItem) => {
  return (
    <View style={{borderRadius:10, flexDirection:'row', backgroundColor:Colors.TABBAR, marginVertical:3, paddingVertical:10}}>
        <Text style={{textAlign:'left',color:Colors.WHITE, marginLeft:10, borderRightColor:Colors.WHITE_TRASPARENT}}>{agendaItem.horario}</Text>
        <Text style={{marginLeft:'10%',textAlign:'left', color:Colors.TEXT_SEC}}>{agendaItem.descripcion}</Text>
    </View>
  )
}
