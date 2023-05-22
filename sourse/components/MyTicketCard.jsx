import React, { useEffect } from 'react';

import * as Calendar from 'expo-calendar';

import { Text, TouchableOpacity, View,Platform } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchCard } from './SearchCard'
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MyTicketCard = ({event}) => {

    useEffect(() => {
        (async () => {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
          if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            console.log('Here are all your calendars:');
            console.log({ calendars });
          }
        })();
      }, []);
  return (<View>
      <SearchCard event = {event}> </SearchCard>
  <TouchableOpacity onPress={createCalendar}   style={{ paddingHorizontal:10, display:'flex',
                    backgroundColor:Colors.SOMBREADO,
                    borderRadius:25, width:50,
                    height: 40, width: 40, alignItems: 'center', alignContent: 'center', justifyContent: 'center', left: '80%', bottom: '15%', position: 'absolute'}}>
      <MaterialCommunityIcons name={event.agended? "calendar-check":"calendar-plus"} size={20} color={Colors.WHITE} />
      
      
    </TouchableOpacity>

  </View>
  )
  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }
  
  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }
}
