import React, { useState } from 'react'
import { View,Text, TextInput, Modal, Button } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Input, Avatar, InputLeftAddon, InputRightAddon, Stack, Center, NativeBaseProvider ,Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from '../constants/Colors';

import Ionicons from '@expo/vector-icons/Ionicons';
import EVENT_CATEGORIES from '../constants/AppConstants'


const categories = ['CONCIERTO','TEATRO','SHOW','CINE'];

const ModalStyle = {width:'80%',
                    
                     backgroundColor:Colors.PURPLE,
                    //flex:1,
                    marginTop:'30%',
                    margin:'10%',
                    borderRadius:20,
                    //justifyContent:'center',
                    // height:'80%', 
                    
                    };
const InputStyle = {
    backgroundColor:Colors.PURPLE_DARK,
    marginVertical:10,
    padding: 15,
    borderRadius:10,
    width:'84%',
    marginHorizontal:'8%',
    color:Colors.WHITE,
    borderColor: Colors.BLACK,
    borderWidth: 1

}

const PickerStyle ={
    backgroundColor:Colors.PURPLE_DARK,
    marginVertical:10,
    
    borderRadius:10,
    width:'84%',
    marginHorizontal:'8%',
    color:Colors.WHITE,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    nnumberOfLines:1
}

const bottonStyle ={
    borderRadius:10,
    backgroundColor:Colors.PURPLE_BUTTOM,
    padding:10,
    paddingHorizontal:20,
    margin:5
}

export const SearchFilter = ({onSubmitFilters}) => {
    const [toggle, setToggle] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");
    const [filtros, setFiltros] = useState({
        'name':null,
        'eventType':null,
        'taglist':null,
    })

    const onPressButton = ()=> {
        setToggle(!toggle);
      };

    const onSubmit =() =>{
        onSubmitFilters(filtros.name, filtros.eventType, filtros.taglist);
        onPressButton();
    }
    //onSubmitFilters(value, filtros.eventType, filtros.tag)
  return (
    <View  
                style={{ backgroundColor: "#1D1D1D", padding: 10, marginVertical:30, borderRadius:15}}
            >
            <View style={{justifyContent:'space-around' ,flexDirection:'row' }}>
            <Ionicons name='search-outline' color={Colors.WHITE} size={30} style={{width:'10%'}} />
            <TextInput  
                style={{ fontSize: 18, backgroundColor: "#1D1D1D",  width: '70%', margin: 5, borderRadius:15}}
                placeholder={"Nombre Evento..."}
                placeholderTextColor="gray"
                onChangeText={(value)=>{onSubmitFilters(value, filtros.eventType, filtros.taglist)}}
                />
                
            <Ionicons name='options-outline' color={Colors.WHITE} size={30} onPress={onPressButton} style={{width:'10%'}}/>
            </View>
            
            <Modal visible={toggle} transparent={true} animationType={'fade'} >
                <View style={ModalStyle}>
                    <View style={{borderTopStartRadius:20,paddingVertical:20, borderTopEndRadius:20, backgroundColor:Colors.PURPLE_LIGTH }}>
                        <Text style={{color:Colors.WHITE , 
                            
                            fontSize:28,
                            
                            textAlign:'center',
                            }}>Filtros</Text>
                    </View>
                    <TextInput  
                    style={InputStyle}
                    placeholder={"Nombre Evento"}
                    value={filtros.name}
                    placeholderTextColor="gray"
                    onChangeText={(value) => {setFiltros({...filtros,'name':value})}}/>
                    <Picker
                        selectedValue={filtros.eventType}
                        style={PickerStyle}
                        itemStyle={{color:'#FFFFFF' }}
                        onValueChange={(itemValue, itemIndex) => setFiltros({...filtros,'eventType':itemValue})}
                    >
                        <Picker.Item  key='null' label="Sin Seleccionar" value="" />
                        {categories.map((category) => <Picker.Item key={category} style={{color:Colors.WHITE}} label={category} value={category} />)}
                    </Picker>
                    <View style={{flexDirection:'row', justifyContent:'center',marginBottom:10}}>
                        
                    <View style={[bottonStyle , {backgroundColor:Colors.PURPLE_DARK}]}>
                        <Button
                        onPress={onPressButton}
                        title="Cancelar"
                        color={Colors.WHITE}
                        accessibilityLabel="Cancelar busqueda"
                        style={{padding:10, paddingHorizontal:20}}
                        />
                        </View>
                        <View style={bottonStyle}>
                        <Button
                        onPress={onSubmit}
                        title="Aplicar"
                        color={Colors.WHITE}
                        accessibilityLabel="Buscar"
                        />
                        </View>
                        
                        
                    </View>
                </View>
                
            </Modal>
            
        </View>
  )
}
