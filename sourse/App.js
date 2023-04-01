import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from './constants/Colors';
import { TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Home } from './screens/Home';
import { Calendar } from './screens/Calendar';
import { MyTickets } from './screens/MyTickets';
import { Favorites } from './screens/Favorites';






function EventsStack() {
  const EventsStack = createNativeStackNavigator();

  return(
    <EventsStack.Navigator initialRouteName="Events" screenOptions={{ headerShown: false }} >
      <EventsStack.Screen name="Home" component={Home} headerShown={false} />
      <EventsStack.Screen name="Calendar" component={Calendar} headerShown={false} />
      <EventsStack.Screen name="MyTickets" component={MyTickets} options={{ headerShown: false }} />
      <EventsStack.Screen name="Favorites" component={Favorites} options={{ headerShown: false}}/>
      {/* <EventsStack.Screen name="EventQR" component={EventQR} options={{ headerShown: false}}/>
      <EventsStack.Screen name="ShowPeople" component={ShowPeople} options={{ headerShown: false}}/>
      <EventsStack.Screen name="PeopleInEvent" component={FriendsAssistanceToEvent} options={{ headerShown: false}}/> */}
    </EventsStack.Navigator>
  )
}

function AuthenticatedBottomTab() {
  const AuthTab = createBottomTabNavigator();

  // const TabBarFloatingButton = (props) => {
  //   return (
  //     <View style={{ position: 'relative', alignItems: 'center' }} pointerEvents="box-none">
  //       <TouchableOpacity style={{ top: -15, borderRadius: 50, backgroundColor: Colors.PRIMARY, height: 60, width: 60, alignItems: 'center', justifyContent: 'center' }} onPress={props.onPress} >
  //         <Entypo name="plus" color={Colors.WHITE} size={35} style={{ fontWeight: 'bold' }} />
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }

  return (
    <AuthTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.TABBAR_ACTIVE,
        tabBarInactiveTintColor: Colors.TABBAR_INACTTIVE,
        tabBarStyle: {
          elevation: 30,
          backgroundColor: Colors.TABBAR,
          borderTopWidth: 0,
          opacity:'50%'
        }
      }}
    >
      <AuthTab.Screen
        name="EventsStack"
        component={EventsStack}
        options={{
					tabBarIcon: ({ focused, color, size }) => <Ionicons name='home-outline' color={color} size={size} />,
          headerShown: false
				}}
      />
      <AuthTab.Screen
        name="Calendar"
        component={Calendar}
        options={{
					tabBarIcon: ({ focused, color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
          headerShown: false
				}}
      />
      <AuthTab.Screen
        name="MyTickets"
        component={MyTickets}
        options={{
          
					tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons name="ticket-confirmation-outline" color={color} size={size} />,
          headerShown: false
				}}
      />
      <AuthTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
					tabBarIcon: ({ focused, color, size }) => <Ionicons name='heart-outline' color={color} size={size} />,
          headerShown: false
				}}
      />
    </AuthTab.Navigator>
  )
}

const MainStack = createNativeStackNavigator();

export default function App() {


  useEffect(() => {
    // Session.getInstance().load()
    // .then(session => {
    //   setAppAuthContext({
    //     userSession: session,
    //     favorites: []
    //   })
    // })
  }, []);

  return (

        <NavigationContainer >
          <MainStack.Navigator >
             
              <MainStack.Screen 
                name="AuthStack" component={AuthenticatedBottomTab} options={{ headerShown: false }}
              />
            
              
            
          </MainStack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
  );
}
