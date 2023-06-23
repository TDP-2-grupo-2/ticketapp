

import React, { useContext, useState, useEffect } from 'react'
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
import { AntDesign } from '@expo/vector-icons';

import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoginContext } from '../context/LoginContext';
import Colors from '../constants/Colors';
import { registerDevice, registerDivace, signIn } from '../presenters/Sesion';

import { TokenContext } from '../context/TokenContext';
import { ModalAccept } from '../components/ModalAccept';

export const LoginGoogleButtom = () => {
    const { setAuthenticated } = useContext(LoginContext);
    const tokenDevice = useContext(TokenContext);
    const [toggle, setToggle] = useState(false);

    const onPressButton = async ()=> {
      let credentials = await signIn();
      //console.log(credentials);
      setAuthenticated(credentials);
      if(credentials){
        registerDevice(credentials.token, tokenDevice)
      }else{
        setToggle(true);
      }
      

    }
  return (
    <View>
        <ModalAccept toggle={toggle} header='Error' bodyText={'Nos e pudo ingresar con Google, prueba mas tarde'} setToggle = {setToggle} type="error"></ModalAccept>

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
