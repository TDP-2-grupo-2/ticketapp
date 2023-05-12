import { LinearGradient } from 'expo-linear-gradient'
import React, {useEffect,useState} from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SmallCalendar } from '../components/SmallCalendar';


export const TicketQr = ({route}) => {
    const navigator = useNavigation();
    const [params, setParams] = useState({})

    useEffect(() => {
        setParams(route.params)
      console.log(params)

    }, [])
    
  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
          <LinearGradient 
        colors={[Colors.BLACK, Colors.BACKGROUND_TICKETS]} 
        style={{position:'absolute',bottom:0,height : '30%', width : '100%'}}/>
            <TouchableOpacity  onPress={() => {navigator.goBack()}} style={{ marginLeft:20,paddingHorizontal:10,
                   paddingVertical:5, backgroundColor:Colors.SOMBREADO,
                    borderRadius:15,}}>
      <Ionicons  name="arrow-back-sharp" color={Colors.WHITE} size={30}></Ionicons>
    </TouchableOpacity>
    
    <View style={{marginHorizontal: 18, marginBottom:'10%'}}>
    <View style={{position:'absolute',
                  
                  width:'100%',
                  //left:20,
                  flexDirection:"row", justifyContent: 'space-between',
                  top:60}}>

                  </View>

    
        <View style={{marginTop:'5%',flexDirection:'row', alignContent:'center', alignItems:'center'}} >
            <>
              <MaterialCommunityIcons name="ticket-confirmation-outline" color={Colors.WHITE} size={36} />
              <Text style={{color:Colors.WHITE, fontSize:30, marginLeft:10}}>{params?.eventName}</Text>
            </>
        </View>
        <View style={{alignContent:'center', alignSelf:'center', marginVertical:'10%' }}>
            <QRCode size={300}
            value={params.ticketId}
            />
            
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', alignContent:'center', alignItems:'center'}}>
        <SmallCalendar day={params.day} month={params.month}  ></SmallCalendar>
        <Text style={{color:Colors.WHITE, fontSize:30, marginLeft:10}}>Estado: Valido</Text>

        </View>
        <Text style={{color:Colors.WHITE, fontSize:15,marginTop:10, marginLeft:10}}>Desde: {params.start} hasta: {params.end}</Text>



    </View>

    {/* <View>
    
    <Text>{JSON.stringify(authenticated) }</Text>
    </View> */}
            
    
</View>
  )
}

