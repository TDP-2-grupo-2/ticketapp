import React, { useEffect, useState } from 'react'
import { Text, View ,Image,ImageBackground, TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors';
import { getFireBaseImage } from '../presenters/HomePresenter';
import { SmallCalendar } from './SmallCalendar';
import { useNavigation } from '@react-navigation/native';
import { TagChip } from './TagChip';

export const ImageCard = ({event}) => {
    const [image, setImage] = useState("https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png");
    const navigation = useNavigation();
    

    useEffect(() => {
        
       //getFireBaseImage(event.imageURI, setImage);
    }, [])

    const onCardPress = () => {
      navigation.navigate('EventDetail', event);  
  }


  return (
    
    <View style={{borderRadius:30 ,marginHorizontal:10}}> 
    <TouchableOpacity onPress={onCardPress}>
    <Image style={{ height: 250, width:250, borderRadius:20}} source={{ uri: event.image }}> 
    </Image>
    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
    
   <Text  style={{color:Colors.WHITE, position:"absolute",fontSize:24, top: 200, left:15 ,borderRadius:17,backgroundColor:Colors.SOMBREADO}}>{event.eventName}</Text>
    <SmallCalendar date={event.dateEvent}  style={{top: 10, left:180}}></SmallCalendar>
    {/* <View>
      {
         event.tags?
        event.tags.map(tag => <TagChip key={tag} tag ={tag}></TagChip>)
        :
        <></>
      }
    </View> */}
    

   </View>
    </TouchableOpacity>

    </View>
  )
}
