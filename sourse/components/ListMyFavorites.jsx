import React, { useEffect, useState,useContext } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { getEventsByCategories } from '../presenters/HomePresenter'
import { SearchCard } from './SearchCard'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoginContext } from '../context/LoginContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getEvents } from '../presenters/MyFavorites';
export const ListMyFavorites = () => {
    const [eventos, setEventos] = useState([])
    const { authenticated } = useContext(LoginContext);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
      getEvents(authenticated.token,setEventos );
      //getEventsByCategories(setEventos ,.name,filtros.eventType,filtros.taglist);
      
   }, [])

   const onRefresh = async () => {
    setRefreshing(true);
    await getEvents(authenticated.token,setEventos );
    setRefreshing(false);
}
    return (
      
      <ScrollView style={{marginBottom:'40%',}}
      refreshControl={
        <RefreshControl refreshing={refreshing} 
            onRefresh={onRefresh} />
    }
      >
        {eventos.length>=1 ?
        eventos.map(evento => <SearchCard key={evento.eventId} event = {evento}> </SearchCard>)
        :
        <View style={{justifyContent:'center', alignItems:'center', marginTop:'20%'}}>
          <Ionicons name='heart-outline' color={Colors.TABBAR_INACTTIVE} size={150} style={{marginVertical:'20%'}}/>
          <Text style={{color:Colors.WHITE ,  fontSize:20}}>Todavia no tienes eventos favoritos!</Text>
        </View>
        }  
        </ScrollView>
        
      )
}
