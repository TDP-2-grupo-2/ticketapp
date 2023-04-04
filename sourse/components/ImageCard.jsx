import React, { useEffect, useState } from 'react'
import { Text, View ,Image,ImageBackground, TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors';
import { getFireBaseImage } from '../presenters/HomePresenter';
import { SmallCalendar } from './SmallCalendar';
import { useNavigation } from '@react-navigation/native';

export const ImageCard = ({event}) => {
    const [image, setImage] = useState('');
    const navigation = useNavigation();
    

    useEffect(() => {
        
       getFireBaseImage(event.imageURI, setImage);
    }, [])

    const onCardPress = () => {
      navigation.navigate('EventDetail', event);  
  }


  return (
    
    <View style={{borderRadius:30}}> 
    <TouchableOpacity onPress={onCardPress}>
    <Image style={{ height: 250, width:250, borderRadius:20}} source={{ uri: image }}> 
    </Image>
    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
   <Text  style={{color:Colors.WHITE, position:"absolute",fontSize:24, top: 200, left:15}}>{event.eventName}</Text>
    <SmallCalendar date={23} month='DIC' style={{top: 10, left:180}}></SmallCalendar>
    <Text style={{color:Colors.TEXT_SEC, fontSize:13,top: 170, left:15}}>{event.otherCategories}</Text>

   </View>
    </TouchableOpacity>

    </View>
  )
}
