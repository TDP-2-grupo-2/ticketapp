import React , {useEffect,useState}from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ListMyTickets } from '../components/ListMyTickets';
import Colors from '../constants/Colors';
import { LoginContext } from '../context/LoginContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getEvent } from '../presenters/EventDetail';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

export const LinkInvalidEventsScreen = (params) => {
    const [event, setEvent] = useState(null);
    const [messagge, setMessagge] = useState("No se han encontrado eventos")
    const navigator = useNavigation();
    const getEvento = async ( event_id) =>{
        await getEvent(setEvent, event_id)
    }
    const procesarEstado = (status) => {
        if(status == 'cancelled'){
            setMessagge("El evento ha sido cancelado")
        }
        if(status == 'suspended'){
            setMessagge("El evento ha sido suspendido")
        }
    }
    useEffect(() => {
        getEvento(params.route.params.event_id);
        //console.log(params.route.params)
        procesarEstado(params.route.params.modifications.status);
    }, [])
    
  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
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
        <LinearGradient 
        colors={[Colors.BLACK, Colors.BACKGROUND_TICKETS]} 
        style={{position:'absolute',bottom:0,height : '30%', width : '100%'}}/>

        
        <View style={{marginTop:'15%',marginHorizontal:'5%',flexDirection:'row', alignContent:'center', alignItems:'center'}} >
        <>
            <MaterialCommunityIcons name="ticket-confirmation-outline" color={Colors.WHITE} size={36} />
            <Text style={{color:Colors.WHITE, fontSize:36, marginLeft:10}}>{event?event.eventName: "Ocurrio un Error" }</Text>
        </>
            
        </View>
        <View style={{justifyContent:'center', height:'80%', alignItems:'center'}}>
      <MaterialCommunityIcons name="emoticon-sad-outline" size={150} color={Colors.TABBAR_INACTTIVE} />

      <Text style={{color:Colors.WHITE ,  fontSize:20}}>{event?messagge :'El evento no existe...'}</Text>
    </View>
    </View>
  )
}
