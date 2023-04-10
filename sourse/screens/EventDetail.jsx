import React, { useEffect, useState } from 'react'
import { Button, Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { getFireBaseImage } from '../presenters/HomePresenter';
import { SmallCalendar } from '../components/SmallCalendar';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from "native-base";
import Stack from '@mui/material/Stack';
import { getEvent } from '../presenters/EventDetail';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fontisto } from '@expo/vector-icons'; 
import { FrequentQuestion } from '../components/FrequentQuestion';
import MapView from 'react-native-maps';

import {Marker} from 'react-native-maps';

const SeccionStyle = {
  marginVertical: 10,
  color:Colors.WHITE,
}

const TitleStyle = {
  marginVertical: 10,
  color:Colors.WHITE, fontSize:20,  marginTop:20, marginBottom:10
}

const NavbarStyle ={
   position:'absolute',
   bottom:'0%',
   width:'100%',
   borderTopRightRadius:10,
   borderTopLeftRadius:10,
   flexDirection:'row',
   justifyContent:'space-between',
  backgroundColor:Colors.TABBAR,
  paddingBottom: 20,
  paddingTop: 10,
  alignItems:'center'
   
}

const ButtomStyle = {
  margin:10,
  padding:10,
  marginHorizontal:20,
  backgroundColor:Colors.PURPLE_BUTTOM,
  borderRadius:10,
  color:Colors.WHITE,
  alignItems:'center'
}
const whithVacants ={
  fontSize:18,
  color:Colors.WHITE
}
const whithNoVacants ={
  fontSize:18,
  color:Colors.RED
}

const ButtonBlock = {
  backgroundColor:Colors.RED,
}
export const EventDetail = ({route}) => {
    const navigator = useNavigation();
    //const event = route.params;
    const [event, setEvent] = useState({})
    const [fecha, setFecha] = useState('2023-12-3')
    useEffect(() => {
      
       getEvent(setEvent, route.params)
    }, [])
    
    useEffect(() => {
      
      setFecha(event.dateEvent)
      
    }, [event])
    

  return (
    <View>
      
    <ScrollView style={{ backgroundColor: Colors.BLACK, height:'100%',paddingBottom:'100%'}} >
    
    <ImageBackground
    style={{width : '100%', height: 300}}
    source={{uri : event.image}}>

    <LinearGradient 
        colors={['#00000000', Colors.BLACK]} 
        style={{height : '100%', width : '100%'}}/>
   
</ImageBackground>
    
    
    <View style={{top: 200 ,position:'absolute', marginLeft:'5%',width:'90%'}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
        <Text  style={{color:Colors.TEXT_SEC, fontSize:13}}>{event.eventType}</Text>
          <Text  style={{color:Colors.WHITE, fontSize:30}}>{event.eventName}</Text>
          <Text  style={{color:Colors.TEXT_SEC, fontSize:13}}>Desde: {event.start} hasta: {event.end}</Text>
        </View>
        <SmallCalendar day={event.day} month={event.month}  ></SmallCalendar>
        </View>
    </View>
    <View >
   </View>
   <View style={{marginHorizontal:10}}>
   <Text style={[TitleStyle]}>Descripción</Text>
   <Text  style={{color:Colors.WHITE, fontSize:16}}>
   {event.description}
   </Text>

   <Text style={[TitleStyle]}>Locación</Text>
   <View style={{ marginLeft:'5%', borderRadius:20}}>
    <MapView
      style={{width: '95%',
      height: 100,borderRadius:20}}
      initialRegion={{
      latitude:   event.latitud,
      longitude:  event.longitud,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
      }}
      
      >

      <Marker
      key={event.eventId}
      coordinate={{latitude: event.latitud, longitude: event.longitud}}
      title={event.eventName}
      
    />
      </MapView>
   </View>

   {/* <Image style={{ height: 100, borderRadius:20}} source={{ uri: event.image }}> 
    </Image> */}
    <View>
    
        <Text style={[SeccionStyle, {fontSize:16}]}>{event.locationDescription}</Text>

    </View>

    <Text style={[TitleStyle]}>Organizador</Text>
  <View style={[SeccionStyle,{flexDirection:'row', alignItems:"center"}]}>

  <Avatar bg="green.500" source={{
      uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }}> AJ
    </Avatar>
    <Text style={{color:Colors.WHITE, fontSize:16, margin:10}}>{event.owner}</Text>
    </View>

   <Text style={[TitleStyle,{color:Colors.WHITE, fontSize:20, marginTop:20,marginBottom:10}]}>Preguntas Frecuentes</Text>
   <View style={{marginBottom:'40%'}} >
    {event.faqs ? 
      //  <Text>{JSON.stringify(Object.keys(event.faqs) )}</Text>
      event.faqs.map((pregunta) =>  <FrequentQuestion key={pregunta.pregunta} question={pregunta.pregunta} answer={pregunta.respuesta}></FrequentQuestion>)
      //<Text>{JSON.stringify(event.faqs)}</Text>
      :
      <></>
      }
   </View>
   </View>


    </ScrollView>
    <View style={{position:'absolute',
                  
                    width:'100%',
                    //left:20,
                    flexDirection:"row", justifyContent: 'space-between',
                    top:60}}>
    <TouchableOpacity  onPress={() => {navigator.goBack()}} style={{ marginLeft:20,paddingHorizontal:10,
                   paddingVertical:5, backgroundColor:Colors.SOMBREADO,
                    borderRadius:15,}}>
      <Ionicons  name="arrow-back-sharp" color={Colors.WHITE} size={30}></Ionicons>
    </TouchableOpacity>
    <View style={{ marginRight:20,paddingHorizontal:10,
                   paddingVertical:5, backgroundColor:Colors.SOMBREADO,
                    borderRadius:15, flexDirection:'row'}}>
    <TouchableOpacity   >
      <Ionicons  name="heart-outline" style={{marginRight:10}} color={Colors.WHITE} size={30}></Ionicons>
    </TouchableOpacity>
    <TouchableOpacity  >
      <Ionicons  name="paper-plane-outline" color={Colors.WHITE} size={30}></Ionicons>
    </TouchableOpacity>
    </View>
    
    </View>
    
    <View style={[NavbarStyle,{}]}>
      <View style={{marginLeft:'10%'}}>
        <Text style={event.capacity > event.attendance?whithVacants :whithNoVacants }>Vacantes</Text>
        <Text style={event.capacity > event.attendance?whithVacants :whithNoVacants }>{event.attendance +'/'+event.capacity}</Text>
      </View>
      
      <TouchableOpacity style={[ButtomStyle,event.capacity < event.attendance ? ButtonBlock:{}, {flexDirection:"row", justifyContent: "center"}]}>
      <Text style={{color:Colors.WHITE ,marginHorizontal:10}} >{event.capacity > event.attendance ? 'Adquirir Ticket': 'Tickets Agotados'}</Text>
      <Fontisto name={event.capacity > event.attendance ? 'ticket': 'confused'} size={24} color="white" />
      {/* <Ionicons color={Colors.WHITE} size={30}></Ionicons> */}
      </TouchableOpacity>
      
      {/* <LinearGradient 
        colors={['#00000000', Colors.TABBAR]} 
        style={{height : '100%', width : '100%'}}/> */}
    </View>
    </View>
  )
}
