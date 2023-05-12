import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const SmallCalendar = (date) => {
  const [mes, setMes] = useState(11)
  const [dia, setDia] = useState(1)

  // const  parseDate =  ( )=> {
  //   console.log(date)
  //   let fecha  = date.date
  //   console.log(fecha)
  //   if(fecha){
  //     fecha = fecha.split('-')
  //     setDia(fecha[2])
  //     setMes(parseInt(fecha[1]))

  //   }
  // }
  // useEffect(() => {
    
  //   parseDate(date)

  //   //const dia = date.date;

  // }, [])
  
  return (
    <View style={[date.style,{borderRadius:15, backgroundColor: '#CCFFFFFF',height:60   ,width:60,alignContent:'center',alignItems:'center'}]}>
        <Text style={{color:'#000000', opacity:50,marginTop:5,fontSize:15}}>{monthNames[date.month]}</Text>
        <Text style={{color:'#000000', fontSize:20}}>{date.day}</Text>
    </View>
  )
}
