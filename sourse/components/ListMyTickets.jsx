import React, { useEffect, useState,useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SearchCard } from './SearchCard'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoginContext } from '../context/LoginContext';
import { getEvents } from '../presenters/MyTickets';
import { RefreshControl } from 'react-native';
import { MyTicketCard } from './MyTicketCard';
export const ListMyTickets = ({idPersona}) => {
    const [eventos, setEventos] = useState([])
    const { authenticated } = useContext(LoginContext);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
  
      getEvents(authenticated.token,setEventos );
      //console.log(authenticated.token)
   }, [])
   const onRefresh = async () => {
    setRefreshing(true);
    await getEvents(authenticated.token,setEventos );
    setRefreshing(false);
}
    return (
      <ScrollView style={{marginBottom:'10%',}}
      refreshControl={
        <RefreshControl refreshing={refreshing} 
            onRefresh={onRefresh} />
      }
      >
      {eventos.length>=1 ?
      eventos.map(evento => <MyTicketCard key={evento.eventId} event = {evento}> </MyTicketCard>)
      :
      <View style={{justifyContent:'center', alignItems:'center', marginTop:'20%'}}>
        <Fontisto name="ticket" size={150} color={Colors.TABBAR_INACTTIVE} style={{marginVertical:'20%'}}/>
  
        <Text style={{color:Colors.WHITE ,  fontSize:20}}>Todavia no tienes entradas!</Text>
      </View>
      }  
      </ScrollView>
      
    )
}
