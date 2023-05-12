import React, { useState } from 'react'
import { View,Text, TextInput, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Input, Avatar, InputLeftAddon, InputRightAddon, Stack, Center, NativeBaseProvider ,Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from '../constants/Colors';

import Ionicons from '@expo/vector-icons/Ionicons';
import EVENT_CATEGORIES from '../constants/AppConstants'
import DebouncedInput from './DebouncedInput';
import {Slider} from '@miblanchard/react-native-slider';
//import Slider from "react-native-a11y-slider";

const categories = ['CONFERENCIA','CONCIERTO','TEATRO','SHOW','CINE','OTRO'];

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
    margin:5,
    
}

export const SearchFilter = ({onSubmitFilters}) => {
    const [toggle, setToggle] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");
    const [filtros, setFiltros] = useState({
        'name':null,
        'eventType':null,
        'taglist':null,
    })

    const [filtroDistancia, setFiltroDistancia] = useState({min:0, max:500})

    const onPressButton = ()=> {
        setToggle(!toggle);
      };

    const onSubmit =() =>{
        onSubmitFilters(filtros.name, filtros.eventType, filtros.taglist, `${filtroDistancia.min},${filtroDistancia.max}` );
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
                style={{ fontSize: 18,color:Colors.WHITE, backgroundColor: "#1D1D1D",  width: '70%', margin: 5, borderRadius:15}}
                placeholder={"Nombre Evento..."}
                placeholderTextColor="gray"
                onChangeText={(value) => {onSubmitFilters(value, null, null)}}
                />
            
            {/* <DebouncedInput onChange={(value)=>{onSubmitFilters(value, filtros.eventType, filtros.taglist)}} delay={1000} /> */}
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
                        itemStyle={{color:'#000000' }}
                        onValueChange={(itemValue, itemIndex) => setFiltros({...filtros,'eventType':itemValue})}
                    >
                        <Picker.Item  key='null' label="SIN SELECCIONAR" value="" />
                        {categories.map((category) => <Picker.Item key={category} style={{color:Colors.BLACK}} label={category} value={category} />)}
                    </Picker>
                    <View style={{marginHorizontal:'8%'}}>
                        <Text style={{color:Colors.WHITE, fontSize:20,marginBottom:15}}>Distancia:</Text>
                        <View style={{justifyContent:'space-between', flexDirection:'row', }}>
                        <Text style={{color:Colors.WHITE}}>Minima: {filtroDistancia.min}Km</Text>
                        <Text style={{color:Colors.WHITE}}>Máxima: {filtroDistancia.max}Km</Text>
                        </View>
                    </View>
                    
                    
                    <View style={{marginHorizontal:'8%', marginVertical:10}}>


                    
                        <Slider
                        maximumValue = {500}
                        minimumValue = {0}
                        maximumTrackTintColor ={Colors.BLACK}
                        minimumTrackTintColor ={Colors.PURPLE_BUTTOM}
                        thumbTintColor={Colors.PURPLE_BUTTOM}
                        value= {[filtroDistancia.min, filtroDistancia.max]}
                        step={10}
                        onValueChange={value => {
                            setFiltroDistancia({min:value[0], max:value[1]})
                        }}
                        />
                        
                    </View>
                    

                    <View style={{flexDirection:'row', justifyContent:'center',marginBottom:10}}>
                        
                        <TouchableOpacity  style={bottonStyle} onPress={onPressButton}>
                            
                            <Text style={{color:Colors.WHITE}}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={onSubmit} 
                            style={bottonStyle}>
                            <Text style={{color:Colors.WHITE}}>Aplicar</Text>
                        </TouchableOpacity>    
                        
                    </View>
                    
                </View>
                
            </Modal>
            
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 30,

    },
});
