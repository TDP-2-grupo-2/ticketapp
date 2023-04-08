import React from 'react'
import { View,Text, ScrollView, TextInput } from 'react-native'
import { Input, Avatar, InputLeftAddon, InputRightAddon, Stack, Center, NativeBaseProvider ,Icon} from "native-base";
import Colors from '../constants/Colors';

export const ProfileHeader = () => {
  return (
    <View style={{ justifyContent:'space-between' ,flexDirection:'row'}}>
        <View >
            <>
            <Text style={{color:Colors.WHITE}}>Argentina</Text>
        <Text style={{color:Colors.WHITE, fontSize:36}}>Explorar</Text>
            </>
        
    
        </View>
        
    <Avatar bg="green.500" size='md' source={{
uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
}}> AJ
</Avatar>

    
    </View>
  )
}
