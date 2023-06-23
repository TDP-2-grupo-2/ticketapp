import React, { useEffect, useState ,useContext} from 'react'
import { Button, Image, ImageBackground, ScrollView, Share, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { getFireBaseImage } from '../presenters/HomePresenter';
import { SmallCalendar } from '../components/SmallCalendar';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from "native-base";
import Stack from '@mui/material/Stack';
import { getEvent , reserveTicket, getTicket, pachIsFavorite, getIsFavorite} from '../presenters/EventDetail';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fontisto } from '@expo/vector-icons'; 
import { FrequentQuestion } from '../components/FrequentQuestion';
import MapView, { UrlTile } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'; 
import {Marker} from 'react-native-maps';
import { ModalAccept } from '../components/ModalAccept';
import { LoginContext } from '../context/LoginContext';
import { AgendaItem } from '../components/AgendaItem';

import MapboxGL from '@rnmapbox/maps';
import { ReportsModal } from '../components/ReportsModal';
import { ShareButtom } from '../components/ShareButtom';

MapboxGL.setAccessToken('pk.eyJ1IjoicmFtaXJvLXNhbmNoZXoiLCJhIjoiY2xndjlkc3YzMG80NTNwa2xsc3FudGloaSJ9.Fr6JzzPfoSbp-UnxuEr_HA');

const SeccionStyle = {
  marginVertical: 10,
  color:Colors.WHITE,
}

const TitleStyle = {
  marginVertical: 10,
  color:Colors.WHITE, 
  fontSize:20,  
  marginTop:20, 
  marginBottom:10,
  fontWeight:'bold'
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

const image = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png";
export const EventDetail = ({route}) => {
    const navigator = useNavigation();
    //const event = route.params;
    const [event, setEvent] = useState({})
    const [fecha, setFecha] = useState('2023-12-3');
    const [toggle, setToggle] = useState(false);
    const [ticket, setTicket] = useState({});
    const { authenticated } = useContext(LoginContext);
    const [isFavorite, setIsFavorite] = useState(false);

    const initDetail = async () => {
      await getEvent(setEvent, route.params)


      //getTicket()
    }
    useEffect( () => {
      console.log(route);
       initDetail()
    }, [])
    
    useEffect(() => {
      if(event.eventId){
        setFecha(event.dateEvent)
        getIsFavorite(authenticated.token,event.eventId, setIsFavorite);
        getTicket(authenticated.token,event.eventId, setTicket);
      }

    }, [event])


    
    
    const reserveNewTicket = async () =>{
      reserveTicket(authenticated.token,event.eventId, setTicket);
      setToggle(true) //ver de cambiar 
    }
    const onFavoritePress = async () => {
      pachIsFavorite(authenticated.token,event.eventId, setIsFavorite);
    }

    const verTicket = () => {
      navigator.navigate('VerQR', {...ticket, eventName: event.eventName,start:event.start ,end:event.end,day:event.day,month:event.month })
    }
    


    
      //console.log('estas dentro de la funcion')

    

  return (
    <View>
      
    <ScrollView style={{ backgroundColor: Colors.BLACK, height:'100%',paddingBottom:'100%'}} >
    
    <ImageBackground
    style={{width : '100%', height: 300}}
    source={event.image?{uri : event.image}: {uri : image}}>

    <LinearGradient 
        colors={['#00000000', Colors.BLACK]} 
        style={{height : '100%', width : '100%'}}/>
   
</ImageBackground>
    
    <View style={{position:'absolute',top:110 ,right:20   }}>
      {event.eventId ?
      <ReportsModal eventId={event.eventId}></ReportsModal>
      :
      <></>
      }
      
    {/* <TouchableOpacity onPress={denunciarEvento} style={{ marginLeft:'80%',paddingHorizontal:10,
                    paddingVertical:5, backgroundColor:Colors.SOMBREADO,
                    borderRadius:15,
                    }}> 
          <Feather  name="flag" size={30} color={Colors.WHITE} />
        </TouchableOpacity> */}
    </View>
    <View style={{top: 200 ,position:'absolute', marginLeft:'5%',width:'90%'}}>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
        <Text  style={{color:Colors.TEXT_SEC, fontSize:13}}>{event.eventType}</Text>
          <Text  style={{color:Colors.WHITE, fontSize:26}}>{event.eventName}</Text>
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

   {event.longitud? 
         <View style={styles.page}>
         <View style={styles.container}>
           <MapboxGL.MapView style={styles.map} 
            >
                          <MapboxGL.Camera
              zoomLevel={14}
              centerCoordinate={[event.longitud, event.latitud]}
            />
            <MapboxGL.PointAnnotation id={event.eventId} coordinate={[event.longitud, event.latitud]} />
          
            </MapboxGL.MapView>
         </View>
       </View>
    :
    <></>
  }

   {/* <Image style={{ height: 100, borderRadius:20}} source={{ uri: event.image }}> 
    </Image> */}
    <View>
    
        <Text style={[SeccionStyle, {fontSize:16}]}>{event.locationDescription}</Text>

    </View>

    <Text style={[TitleStyle]}>Organizador</Text>
  <View style={[SeccionStyle,{flexDirection:'row', alignItems:"center"}]}>
  <Ionicons  name='person'  style={{marginHorizontal:5}} color={Colors.WHITE} size={20}></Ionicons>
 
    <Text style={{color:Colors.WHITE, fontSize:16, margin:10}}>{event.owner}</Text>
    </View>


    {event.agenda ? 
        <>
                  <Text style={[TitleStyle,{color:Colors.WHITE, fontSize:20, marginTop:20,marginBottom:10}]}>Agenda</Text>
          <View style={{marginBottom:'5%'}} >
      {event.agenda.map((agendaItem) =>  <AgendaItem key={agendaItem.horario} horario={agendaItem.horario} descripcion={agendaItem.descripcion}></AgendaItem>)}
      </View>
        </>
      :
      <></>
      
      }
   
   <Text style={[TitleStyle,{color:Colors.WHITE, fontSize:20, marginTop:20,marginBottom:10}]}>Preguntas Frecuentes</Text>
   <View style={{marginBottom:'40%'}} >
    {event.faqs ? 
      event.faqs.map((pregunta) =>  <FrequentQuestion key={pregunta.pregunta} question={pregunta.pregunta} answer={pregunta.respuesta}></FrequentQuestion>)
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
    <TouchableOpacity  onPress={() =>{onFavoritePress()}} >
      <Ionicons  name={isFavorite? "heart":"heart-outline"}  style={{marginRight:10}} color={Colors.WHITE} size={30}></Ionicons>
    </TouchableOpacity>
    <ShareButtom event={event}></ShareButtom>
    </View>
    
    </View>
    <ModalAccept toggle={toggle} header='¡Genial!' bodyText='Acabas de reservar tu entrada' setToggle = {setToggle}></ModalAccept>
    
    {event.capacity? 
    <View style={[NavbarStyle,{}]}>
    <View style={{marginLeft:'10%'}}>
      <Text style={event.capacity > event.attendance?whithVacants :whithNoVacants }>Vacantes</Text>
      <Text style={event.capacity > event.attendance?whithVacants :whithNoVacants }>{event.attendance +'/'+event.capacity}</Text>
    </View>
    {
      ticket.ticketId?//aca hay q cambiar por si tiene ticket
      <TouchableOpacity onPress={verTicket} style={[ButtomStyle,{ backgroundColor:Colors.TICKET_BUTTOM}, {flexDirection:"row", justifyContent: "center"}]}>
      <Text style={{color:Colors.WHITE ,marginHorizontal:10}} >Ver entrada</Text>
      <Fontisto name='qrcode' size={24} color="white" />
      </TouchableOpacity>
      :
      <TouchableOpacity 
        style={[ButtomStyle,event.capacity < event.attendance ? ButtonBlock:{}, 
        {flexDirection:"row", justifyContent: "center"}]}
        onPress= { () => reserveNewTicket()}
      >
      <Text style={{color:Colors.WHITE ,marginHorizontal:10}} >
        {event.capacity > event.attendance ? 'Adquirir Ticket': 'Tickets Agotados'}
      </Text>
      <Fontisto name={event.capacity > event.attendance ? 'ticket': 'confused'} size={24} color="white" />
      </TouchableOpacity>
      

    }
    
    

  </View>
    :
    <></>}
    
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 150,
    width: '100%',
  },
  map: {
    flex: 1
  }
});
