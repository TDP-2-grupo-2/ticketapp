import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { getFireBaseImage } from '../presenters/HomePresenter';
import { SmallCalendar } from '../components/SmallCalendar';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from "native-base";
import Stack from '@mui/material/Stack';

export const EventDetail = ({route}) => {
    const [image, setImage] = useState("https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png");
    const event = route.params;

    useEffect(() => {
       // getEventDetail()
       //getFireBaseImage(event.imageURI, setImage);
    }, [])
    
  return (
    
    <ScrollView style={{ backgroundColor: Colors.BLACK, height:'100%'}}>
        
    <ImageBackground
    style={{width : '100%', height: 300}}
    source={{uri : image}}>

    <LinearGradient 
        colors={['#00000000', Colors.BLACK]} 
        style={{height : '100%', width : '100%'}}/>
   
</ImageBackground>
    <View style={{top: 200 ,position:'absolute', width:'100%'}}>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <Text  style={{color:Colors.WHITE, fontSize:30}}>{event.eventName}</Text>
        
        <SmallCalendar date={23} month='DIC' style={{rigth:20}} />
        </View>
    
    </View>
    <Text style={{color:Colors.TEXT_SEC}}>{event.otherCategories}</Text>
    <View >

    
    

   </View>
   
   <View style={{marginHorizontal:10}}>
   <Avatar bg="green.500" source={{
      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }}> AJ
    </Avatar>
   

   <Text style={{color:Colors.WHITE, fontSize:20,  marginTop:20, marginBottom:10}}>Descripción</Text>
   <Text  style={{color:Colors.WHITE, fontSize:16}}>
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus viverra enim, id tincidunt turpis scelerisque sit amet. Ut aliquam tincidunt nunc. 
   </Text>

   <Text style={{color:Colors.WHITE, fontSize:20, marginTop:20,marginBottom:10}}>Locacion</Text>
   <Image style={{ height: 100, borderRadius:20}} source={{ uri: image }}> 
    </Image>
    <Text style={{color:Colors.WHITE, fontSize:20}}>Organizador</Text>
  <View style={{flexDirection:'row', alignItems:"center"}}>
  <Image style={{ height: 35, width:35, borderRadius:100}} source={{ uri: image }}> 
    </Image>
    <Text style={{color:Colors.WHITE, fontSize:16}}>Pedro Altieri</Text>
    </View>

   <Text style={{color:Colors.WHITE, fontSize:20, marginTop:20,marginBottom:10}}>Preguntas Frecuentes</Text>
   
   </View>

    </ScrollView>
    
  )
}
