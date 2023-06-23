import { async } from "@firebase/util";
import axios from "axios";
import ApiKeys from "../constants/ApiKeys";
import { LoginContext } from '../context/LoginContext';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import AppConstants from "../constants/AppConstants";


  
  
  
  
  GoogleSignin.configure({
    clientId:ApiKeys.CLIENT_ID,
    androidClientId: ApiKeys.ANDROID_CLIENT_ID,
  });

async function envioCredenciales(email, nombre){
  // console.log('email: ' + email)
  // console.log('nombre: ' +nombre)
    const jsonResponse = await axios.post(
        `${AppConstants.API_URL}/attendees/loginGoogle`,
        {
          email: email,
          name:nombre
        },
    );
    // console.log(JSON.stringify(jsonResponse));
    if (jsonResponse.status === 200){
        if(!jsonResponse.status_code){
            return jsonResponse.data;
        }
    } 

}



export async function  signIn(setCredentials) {
  GoogleSignin.configure({
    clientId:"81707602976-aoopf7lgorp5glk584qsac1seclq6a4t.apps.googleusercontent.com",
    androidClientId: '81707602976-05sq5for64h90arqjk20k1ocge5804m2.apps.googleusercontent.com',
  });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
       let email = userInfo.user.email;
       let name = userInfo.user.givenName +' '+ userInfo.user.familyName;
       let token = await envioCredenciales(userInfo.user.email, name);
       
       //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoiYXR0ZW5kZWUiLCJleHAiOjE2ODIxMjMyNDh9.qeEDi28ebsL-qmHtAVBz-8gh7Vb-MM7yLrBc7KLp5bE';
       let credentials = {email:email,
        name:name,
        photo:userInfo.user.photo, 
        token:token
}
        return credentials;
        //console.log(credentials)
       //setCredentials(credentials)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


  export async function registerDevice( authToken, device){

    // console.log("persona" + authToken)

    // console.log("Dispositivo" +device)
    if(authToken){
      const jsonResponse = await axios.post(
        `${AppConstants.API_NOTIF_URL}/notifications/new_user`,
        {
          device_token:device,
        },{
          headers: {'Authorization': `Bearer ${authToken}`}
        }
    ).catch(function (error) {
      
      // console.log(error.response)
  
    })
    }


  }