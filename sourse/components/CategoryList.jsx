import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { getEventsByCategories } from '../presenters/HomePresenter'
import { ImageCard } from './ImageCard'

export const CategoryList = ({category}) => {
    const [events, setEvents] = useState([{eventId:'2312dssa4' , eventName: 'Imagine Dragons', date: '27/12/2022', otherCategories: ['ROCK','DANCE' ] , imageURI:'sadsadsaa'} ])
    useEffect(() => {
       //setEvents(getEventsByCategories(category));
    }, [])
    return (
    <View>

         <Text style={{color:Colors.WHITE , fontSize:20}}>{category}</Text> 
         <ScrollView style={{marginBottom:40, marginTop:10}}
          horizontal={true}>
            {
                events.map(event => <ImageCard key={event.eventId} event = {event}/> )
            }
         </ScrollView>
        {/* <FlatList
            horizontal={true} 
            data={events}
            renderItem={(event) => <ImageCard key={event.eventId} event = {event}/>}
        /> */}
    </View>
  )
}
