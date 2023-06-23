import React, { useEffect,useState ,useContext} from 'react';

import * as Calendar from 'expo-calendar';


import { Text, TouchableOpacity, View,Platform } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchCard } from './SearchCard'
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ModalAccept } from './ModalAccept';
import { LoginContext } from '../context/LoginContext';
import { setCalendar } from '../presenters/MyTickets';

export const MyTicketCard = ({event}) => {
const [toggle, setToggle] = useState(false)
const { authenticated } = useContext(LoginContext);
const [agended, setAgended] = useState(event.agended);
const [granted, setGranted] = useState(false)
const [eventIdInCalendar, setEventIdInCalendar] = useState("") 
  const openCalenarRequest = async () => {
    const {status} = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
       setGranted(true)
    }
}
const eventDetails = {
  title:'Event Title', 
  startDate: new Date('2019-12-14 07:00'),
  endDate: new Date('2019-12-14 15:00'),
  };
useEffect(()=>{
  openCalenarRequest() // Ask for Premission to access phone calendar
  
},[])
const addEventToCalendar = async () => {
  //console.log(event)
  if(event?.status == 'active'){
    let calendarEvent = {
      title: event.eventName, 
      startDate:new Date(event.dateEvent + ' ' + event.start) ,
      endDate: new Date(event.dateEvent + ' ' + event.end),
      };
    //console.log(calendarEvent);
    const eventIdInCalendar = await Calendar.createEventAsync("1",calendarEvent)
    Calendar.openEventInCalendar(eventIdInCalendar)// that will give the user the ability to access the event in phone calendar 
    setEventIdInCalendar(eventIdInCalendar)
    if(eventIdInCalendar){
      setCalendar(authenticated.token,event.eventId, setAgended)
    }
    
  }else{
    setToggle(true);
  }

 }

  return (<View>
      <SearchCard event = {event}> </SearchCard>
  <TouchableOpacity onPress={addEventToCalendar}   style={{ paddingHorizontal:10, display:'flex',
                    backgroundColor:Colors.SOMBREADO,
                    borderRadius:25, width:50,
                    height: 40, width: 40, alignItems: 'center', alignContent: 'center', justifyContent: 'center', left: '80%', bottom: '15%', position: 'absolute'}}>
      <MaterialCommunityIcons name={agended? "calendar-check":"calendar-plus"} size={20} color={Colors.WHITE} />
      
      
    </TouchableOpacity>
    <ModalAccept toggle={toggle} header='Cuidado!' bodyText={'No podes guardar un evento que no esta activo'} setToggle = {setToggle} type="error"></ModalAccept>


  </View>
  )



}
