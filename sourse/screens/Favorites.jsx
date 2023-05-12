import React , {useContext}from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ListMyTickets } from '../components/ListMyTickets';
import Colors from '../constants/Colors';
import { LoginContext } from '../context/LoginContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ListMyFavorites } from '../components/ListMyFavorites';
import Ionicons from '@expo/vector-icons/Ionicons';
export const Favorites = () => {
  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
          <LinearGradient 
        colors={[Colors.BLACK, Colors.BACKGROUND_FAVORITES]} 
        style={{position:'absolute',bottom:0,height : '30%', width : '100%'}}/>
    
    <View style={{marginHorizontal: 18, marginBottom:'10%'}}>
       
    
    
        <View style={{marginTop:'5%',flexDirection:'row', alignContent:'center', alignItems:'center'}} >
            <>
            <Ionicons name='heart-outline' color={Colors.WHITE} size={36} />

              <Text style={{color:Colors.WHITE, fontSize:36, marginLeft:10}}>Favoritos</Text>
            </>
        </View>

        
            
            <ListMyFavorites></ListMyFavorites>
            
            
        
    </View>

    {/* <View>
    
    <Text>{JSON.stringify(authenticated) }</Text>
    </View> */}
            
    
</View>
  )
}
