import React, {useContext} from 'react'
import { View,Text, ScrollView, TextInput } from 'react-native'
import { Input, Avatar, InputLeftAddon, InputRightAddon, Stack, Center, NativeBaseProvider ,Icon} from "native-base";
import Colors from '../constants/Colors';
import {LoginContext}  from '../context/LoginContext';

export const ProfileHeader = () => {
  const { authenticated } = useContext(LoginContext);

  
  return (
    <View style={{ justifyContent:'space-between' ,flexDirection:'row'}}>
        <View >
            <>
              <Text style={{color:Colors.WHITE}}>Argentina</Text>
              <Text style={{color:Colors.WHITE, fontSize:36}}>Explorar</Text>
            </>
        </View>
    <Avatar bg="green.500" size='md' source={{
uri: authenticated.photo
}}> AJ
</Avatar>

    
    </View>
  )
}
