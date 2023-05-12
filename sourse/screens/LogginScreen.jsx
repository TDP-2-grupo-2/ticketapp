import React, { useContext, useState, useEffect } from 'react'
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
import { AntDesign } from '@expo/vector-icons';

import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoginContext } from '../context/LoginContext';
import Colors from '../constants/Colors';
import { signIn } from '../presenters/Sesion';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export const LogginScreen = () => {
    const { setAuthenticated } = useContext(LoginContext);

    const onPressButton = async ()=> {
      let credentials = await signIn();
      //console.log(credentials);
      setAuthenticated(credentials);
    }
  return (
    <View style={{ backgroundColor: Colors.WHITE, height:'100%', alignItems:'center'}}>
    <LinearGradient 
        colors={[Colors.PURPLE_LIGTH, Colors.BLACK]} 
        style={{position:'absolute',height : '100%', width : '100%'}}/>
    <View style={{backgroundColor:Colors.WHITE_TRASPARENT,marginTop:'40%',borderRadius:100,padding:10}}>
    <Fontisto name="ticket" size={72} color="black" />
      
    </View>
    <Text style={{color:Colors.WHITE, fontSize:33, marginTop:'10%'}}>TiketApp</Text>
    <Text style={{color:Colors.WHITE, fontSize:33, marginTop:'10%',fontWeight:'bold'}}>¡Que bueno verte!</Text>
    <MaterialCommunityIcons name="hand-wave-outline" size={150} color="black" style={{marginVertical:'10%'}} />
  <TouchableOpacity style={styles.google} onPress={async () => { await onPressButton()}}>
  <AntDesign name="google" size={24} color="blue" />
    <Text style={{marginLeft:10, color:'blue', fontWeight:'bold'}}>iniciar sesión con google</Text>
    </TouchableOpacity>
    
    </View>

  )
}



const styles = StyleSheet.create({
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
    
  });