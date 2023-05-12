import React, { useEffect, useContext, useState } from 'react'

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
import { EventDetail } from './screens/EventDetail';
import { NativeBaseProvider, Text, Box } from "native-base";
import { isLoggedIn, LoginContext } from './context/LoginContext';
import { LogginScreen } from './screens/LogginScreen';
import { TicketQr } from './screens/TicketQr';


function EventsStack() {
  const EventsStack = createNativeStackNavigator();
  
  return(
    <EventsStack.Navigator initialRouteName="Events" screenOptions={{ headerShown: false }} >
      <EventsStack.Screen name="Home" component={Home} headerShown={false} />
      {/* <EventsStack.Screen name="ShowPeople" component={ShowPeople} options={{ headerShown: false}}/>
      <EventsStack.Screen name="PeopleInEvent" component={FriendsAssistanceToEvent} options={{ headerShown: false}}/> */}
    </EventsStack.Navigator>
  )
}

function AuthenticatedBottomTab() {
  const AuthTab = createBottomTabNavigator();
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
          opacity:50
        }
      }}
    >
            <AuthTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
					tabBarIcon: ({ focused, color, size }) => <Ionicons name='heart-outline' color={color} size={size} />,
          headerShown: false
				}}
      />
      <AuthTab.Screen
        name="EventsStack"
        component={EventsStack}
        options={{
					tabBarIcon: ({ focused, color, size }) => <Ionicons name='home-outline' color={color} size={size} />,
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

    </AuthTab.Navigator>
  )
}

const MainStack = createNativeStackNavigator();

const notAuthenticatedNavigator = createNativeStackNavigator();

export default function App() {
  const islogged = useContext(LoginContext);
  const [authenticated, setAuthenticated] = useState(null);
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
    <LoginContext.Provider value={{ authenticated, setAuthenticated }}>
      <NativeBaseProvider>
          
          <NavigationContainer >
            {authenticated ? 
                        <MainStack.Navigator >
                        <MainStack.Screen 
                          name="AuthStack" component={AuthenticatedBottomTab} options={{ headerShown: false }}
                        />
                      <MainStack.Screen name="EventDetail" component={EventDetail} options={{ headerShown: false}}/>
                      <MainStack.Screen name="VerQR" component={TicketQr} options={{ headerShown: false}}/>

                    </MainStack.Navigator>
            :
              <notAuthenticatedNavigator.Navigator screenOptions={{ headerShown: false }}>
                <notAuthenticatedNavigator.Screen name="Loggin" component={LogginScreen}  options={{ }}/>
                              
              </notAuthenticatedNavigator.Navigator>
              
            }
            <StatusBar style="light" />
          </NavigationContainer>
          </NativeBaseProvider>
      
    </LoginContext.Provider>
        
  );
}
