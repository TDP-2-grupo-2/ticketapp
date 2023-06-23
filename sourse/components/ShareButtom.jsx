import React, {useEffect} from 'react'
import { Image, Share, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';

export const ShareButtom = ({event}) => {
    useEffect(() => {
      //console.log(event) 

    }, [event])
    
    // const imageToBase64 = async (imageUrl) => {
    //     try {
    //       //const response = await fetch(imageUrl);
    //       const blob = await imageUrl.blob();
    //       return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //           const base64data = reader.result;
    //           resolve(base64data);
    //         };
    //         reader.onerror = reject;
    //         reader.readAsDataURL(blob);
    //       });
    //     } catch (error) {
    //       console.error('Error al convertir la imagen en base64:', error);
    //       throw error;
    //     }
    //   };
    const imageToBase64 = async (imageUrl) => {
       
    };
    
   
    const onShare = async () => {
        if(event){
            const appUrl = await Linking.createURL();
            console.log(appUrl);
            const { uri: localImagePath } = await Image.prefetch(event.image);
            try {
              const result = await Share.share({
                title: event.eventName,
                message: `¡Mira este evento!\n${event.eventName}\nhttps://app-link-agustinaa235.cloud.okteto.net?event_id=${event.eventId}`, // Note that according to the documentation at least one of "message" or "url" fields is required
                //url:imageToBase64(event.image),
                url:`https://app-link-agustinaa235.cloud.okteto.net?event_id=${event.eventId}`,
                subject: 'Subject'
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              Alert.alert(error.message);
            }
        }else(
            console.log("todavia es null")
        )
        
      }
    //   const shareAppLink = () => {
    //     const appLink = 'ticketapp://';
    //     const fullLink = `Enlace a mi aplicación: ${appLink}`;
    //     const encodedLink = encodeURIComponent(fullLink);
    //     const whatsappUrl = `whatsapp://send?text=${encodedLink}`;
    //     Linking.openURL(whatsappUrl)
    //       .catch((error) => {
    //         console.error('Error al compartir en WhatsApp:', error);
    //       });
    //   };
  return (
    <TouchableOpacity  onPress={() =>{onShare()}}>
      <Ionicons  name="paper-plane-outline" color={Colors.WHITE} size={30}></Ionicons>
    </TouchableOpacity>
  )
}
