import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { getEventsByCategories } from '../presenters/HomePresenter'
import { SearchCard } from './SearchCard'

export const ListSearchCards = ({filtros}) => {
  const [eventos, setEventos] = useState([])
  useEffect(() => {
     console.log(filtros)
    getEventsByCategories(setEventos ,filtros.name,filtros.eventType,filtros.taglist);
    
 }, [])
    
  return (
    <View>
    {eventos ?
    eventos.map(evento => <SearchCard event = {evento}> </SearchCard>)
    :
    <View>
      <Text>No se han encontrado eventos...</Text>
    </View>
    }  
    </View>
    
  )
}
