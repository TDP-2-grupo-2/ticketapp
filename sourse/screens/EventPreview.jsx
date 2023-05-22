import React, { useEffect, useState ,useContext} from 'react'
import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
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
import { registerDevice } from '../presenters/Sesion';

MapboxGL.setAccessToken('pk.eyJ1IjoicmFtaXJvLXNhbmNoZXoiLCJhIjoiY2xndjlkc3YzMG80NTNwa2xsc3FudGloaSJ9.Fr6JzzPfoSbp-UnxuEr_HA');

const SeccionStyle = {
  marginVertical: 10,
  color:Colors.WHITE,
}

const TitleStyle = {
  marginVertical: 10,
  color:Colors.WHITE, 
  fontSize:20,  
  //marginTop:20, 
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
export const EventPreview = ({route}) => {
    
    const navigator = useNavigation();
    //const event = route.params;
    const [event, setEvent] = useState({})
    const [fecha, setFecha] = useState('2023-12-3');
    const [toggle, setToggle] = useState(false);
    const { authenticated ,setAuthenticated} = useContext(LoginContext);
    const [modifications, setModifications] = useState(null);

    const initDetail = async (modificaciones) => {
      await getEvent(setEvent, route.params.event_id)
      console.log(modificaciones)
      if(modificaciones){
        //setEvent({...event,...modificaciones})
        setModifications(modificaciones)
      }
      console.log(modifications)
      //getTicket()r
    }
    useEffect( () => {
      //console.log(route.params.modifications)
         initDetail(route.params.modifications)
    }, [])
    
    useEffect(() => {
      if(event.eventId){
        setFecha(event.dateEvent)
        // getIsFavorite(authenticated.token,event.eventId, setIsFavorite);
        // getTicket(authenticated.token,event.eventId, setTicket);
      }

    }, [event])


    const onPressButton = async ()=> {
      let credentials = await signIn();
      //console.log(credentials);
      setAuthenticatet(credentials);
      
      registerDevice(credentials.token, tokenDevice)

    }

    

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
    

    <View style={{top: 200 ,position:'absolute', marginLeft:'5%',width:'90%'}}>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
        <Text  style={{color:Colors.TEXT_SEC, fontSize:13}}>{event.eventType}</Text>
          <Text  style={{color:Colors.WHITE, fontSize:26}}>{event.eventName}</Text>
          <Text  style={[{ color:Colors.TEXT_SEC, fontSize:13},modifications?.description? styles.editText:{} ]}>Desde: {event.start} hasta: {event.end}</Text>
        </View>

        <SmallCalendar day={event.day} month={event.month} style={{backgroundColor:Colors.PURPLE_BUTTOM}}  ></SmallCalendar>
        </View>
    </View>
    <View >
   </View>
   <View style={{marginHorizontal:10}}>

    
    <View style={modifications?.description? styles.editSection:{} }>
      
      <Text style={TitleStyle}>Descripción</Text>
      <Text  style={{color:Colors.WHITE, fontSize:16}}>
      {event.description}
      </Text>
    </View>

    <View style={modifications?.location? styles.editSection:{} }>
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
  </View>

     <View style={[modifications?.locationDescription? styles.editSection:{}, {paddingVertical:0, paddingBottom:0}] }>
    
        <Text style={[SeccionStyle, {fontSize:16}]}>{event.locationDescription}</Text>

    </View>

    {event.agenda ? 
        
        <View style={modifications?.agenda? styles.editSection:{} }>
          <Text style={[TitleStyle,{color:Colors.WHITE, fontSize:20, marginTop:20,marginBottom:10}]}>Agenda</Text>
          <View style={{marginBottom:'5%'}} >
            {event.agenda.map((agendaItem) =>  <AgendaItem key={agendaItem.horario} horario={agendaItem.horario} descripcion={agendaItem.descripcion}></AgendaItem>)}
          </View>
        </View>
        
      :
      <></>
      
      }
  <View style={modifications?.agenda? styles.editSection:{} }>
    <Text style={[TitleStyle,{color:Colors.WHITE, fontSize:20, marginTop:20,marginBottom:10}]}>Preguntas Frecuentes</Text>
    <View  >
      {event.faqs ? 
        event.faqs.map((pregunta) =>  <FrequentQuestion key={pregunta.pregunta} question={pregunta.pregunta} answer={pregunta.respuesta}></FrequentQuestion>)
      :
      <></>
      }
    </View>
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

    
    </View>
    <ModalAccept toggle={toggle} header='¡Genial!' bodyText='Acabas de reservar tu entrada' setToggle = {setToggle}></ModalAccept>
    
    {!authenticated.token ? 
    <View style={[NavbarStyle,{}]}>
    <View style={{marginLeft:'10%'}}>
      <Text style={event.capacity > event.attendance?whithVacants :whithNoVacants }>Vacantes</Text>
      <Text style={event.capacity > event.attendance?whithVacants :whithNoVacants }>{event.attendance +'/'+event.capacity}</Text>
    </View>
    
      
    <TouchableOpacity style={styles.google} onPress={async () => { await onPressButton()}}>
  <AntDesign name="google" size={24} color="blue" />
    <Text style={{marginLeft:10, color:'blue', fontWeight:'bold'}}>iniciar sesión con google</Text>
    </TouchableOpacity>
      

    
    
    

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
  },
  google: {
    backgroundColor:Colors.PURPLE,
    flexDirection:'row',
     alignContent:'center',
      alignItems:'center',
    backgroundColor:Colors.WHITE,
    paddingHorizontal:'10%',
    borderRadius:10,
    paddingVertical:5,
    
  },
  editText:{
    color: Colors.PURPLE_BUTTOM,
  },
  editSection:{
    padding:15,
    backgroundColor:Colors.PURPLE,
    borderRadius:15,
    paddingBottom:25,
    marginVertical:5
  }
});
