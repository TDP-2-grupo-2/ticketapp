import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { getEventsByCategories } from '../presenters/HomePresenter'
import { SearchCard } from './SearchCard'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ListSearchCards = ({filtros}) => {
  const [eventos, setEventos] = useState([])
  useEffect(() => {

    getEventsByCategories(setEventos ,filtros.name,filtros.eventType,filtros.taglist);
    
 }, [filtros])
    
  return (
    <View>
    {eventos.length>1 ?
    eventos.map(evento => <SearchCard event = {evento}> </SearchCard>)
    :
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <MaterialCommunityIcons name="emoticon-sad-outline" size={150} color={Colors.TABBAR_INACTTIVE} />

      <Text style={{color:Colors.WHITE ,  fontSize:20}}>No se han encontrado eventos...</Text>
    </View>
    }  
    </View>
    
  )
}
