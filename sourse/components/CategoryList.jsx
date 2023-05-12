import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { getEventsByCategories } from '../presenters/HomePresenter'
import { ImageCard } from './ImageCard'

export const CategoryList = ({category, filtros}) => {
    const [events, setEvents] = useState([{eventId:'----' , eventName: '--------', date: '27/12/2022', otherCategories: ['ROCK','DANCE' ] , imageURI:'sadsadsaa'} ])
    const [filters, setfilters] = useState(null)
    useEffect(() => {
        setfilters(filtros)
       getEventsByCategories(setEvents ,null,category,null,filters?.cordinates,filters?.range);
       
    }, [ filtros])
    return (
    <View>
          {events.length> 0?
          <View>
          <Text style={{color:Colors.WHITE , fontSize:20,fontWeight:'bold'}}>{category}</Text> 
          <ScrollView style={{marginBottom:40, marginTop:10}}
            horizontal={true}>
              {
                  events.map(event => <ImageCard key={event.eventId} event = {event}/> )
              }
          </ScrollView>
          </View>
          :
          <></>
          }

    </View>
  )
}
