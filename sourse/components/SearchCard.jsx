
import React from 'react'
import { Image, Text,TouchableOpacity,View } from 'react-native'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
const TextStyle = {
  marginVertical:3
}
export const SearchCard = ({event}) => {
  const navigation = useNavigation();
  const onCardPress = () => {
    navigation.navigate('EventDetail', event.eventId);  
}
  return (
    
    <TouchableOpacity onPress={onCardPress} style={{backgroundColor:Colors.PURPLE,borderBottomWidth:2,borderColor:'#1D1D1D' , borderRadius:10 , margin:10, justifyContent:'flex-start', flexDirection:'row'}}>
        <Image style={{ height: 90, width:90, borderRadius:10, margin:10}} source={{ uri: event.image }}> 
    </Image>
        <View style={{margin:10, justifyContent:'center'}}>
        <Text style={[TextStyle,{color:Colors.WHITE, fontSize:20, fontWeight:'bold'}]} >{event.eventName}</Text>
        <Text style={[TextStyle,{color:Colors.TEXT_SEC, fontSize:15, fontWeight:'bold'}]} >{event.eventType}</Text>
        <Text style={[TextStyle,{color:Colors.TEXT_SEC, fontSize:15, fontWeight:'bold'}]} >{event.dateEvent}</Text>
        
        </View>

    </TouchableOpacity>
  )
}
