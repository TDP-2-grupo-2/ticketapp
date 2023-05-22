import React, { useState,useContext } from 'react'
import { View,Text, TextInput, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Input, Avatar, InputLeftAddon, InputRightAddon, Stack, Center, NativeBaseProvider ,Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons'; 

import Ionicons from '@expo/vector-icons/Ionicons';
import EVENT_CATEGORIES from '../constants/AppConstants'
import DebouncedInput from './DebouncedInput';
import {Slider} from '@miblanchard/react-native-slider';
import { LoginContext } from '../context/LoginContext';
import { ModalAccept } from './ModalAccept';
import { reportEvent } from '../presenters/EventDetail';
//import Slider from "react-native-a11y-slider";

const categories = [{name:'El evento parece ilegal', value:'ILEGAL'}, {name:'Es publicidad/Spam', value:'SPAM'}, {name:'Contenido Ofensivo', value:'OFENSIVE'}, {name:'No es un evento gratuito', value:'PREMIUM'}, {name:'Tiene contenido discriminatorio', value:'DISCREIMINATION'}];

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

export const ReportsModal = ({eventId}) => {
    const [toggle, setToggle] = useState(false);
    const { authenticated } = useContext(LoginContext);
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [toggleError, setToggleError] = useState(false);
    const [toggleAvvertencia, settoggleAvvertencia] = useState(false)
    const [errorMessage, seterrorMessage] = useState("Ocurrio un error")
    const [filtros, setFiltros] = useState({
        'description':null,
        'reportType':null,

    })



    const onPressButton = ()=> {
        setToggle(!toggle);
      };

    const onSubmit =() =>{
        //console.log(filtros);
        if(!filtros.reportType){
            settoggleAvvertencia(true)
        }else{
            onPressButton();
            reportEvent(authenticated.token,{...filtros, eventId:eventId},setToggleSuccess, setToggleError, seterrorMessage);
        }        
    }

    //onSubmitFilters(value, filtros.eventType, filtros.tag)
  return (
    <View  
            >
            
            <TouchableOpacity onPress={onPressButton} style={{ paddingHorizontal:10,
                    paddingVertical:5, backgroundColor:Colors.SOMBREADO,
                    borderRadius:15,
                    }}> 
          <Feather  name="flag" size={30} color={Colors.WHITE} />
        </TouchableOpacity>
        <ModalAccept toggle={toggleSuccess} header='Exito' bodyText='Se ha realizado la denuncia' setToggle = {setToggleSuccess} type="success"></ModalAccept>
        <ModalAccept toggle={toggleError} header='Error' bodyText={errorMessage} setToggle = {setToggleError} type="error"></ModalAccept>
        <ModalAccept toggle={toggleAvvertencia} header='advertencia' bodyText='Debes seleccionar una categoria para reportar' setToggle = {settoggleAvvertencia} ></ModalAccept>
            <Modal visible={toggle} transparent={true} animationType={'fade'} >
                <View style={ModalStyle}>
                    <View style={{borderTopStartRadius:20,paddingVertical:20, borderTopEndRadius:20, backgroundColor:Colors.PURPLE_LIGTH }}>
                        <Text style={{color:Colors.WHITE , 
                            
                            fontSize:28,
                            
                            textAlign:'center',
                            }}>Reportar Evento</Text>
                    </View>

                    <Picker
                        selectedValue={filtros.reportType}
                        style={PickerStyle}
                        itemStyle={{color:'#000000' }}
                        onValueChange={(itemValue, itemIndex) => setFiltros({...filtros,'reportType':itemValue})}
                    >
                        <Picker.Item  key='null' label="SIN SELECCIONAR" value="" />
                        {categories.map((category) => <Picker.Item key={category.value} style={{color:Colors.BLACK}} label={category.name} value={category.value} />)}
                    </Picker>
                    <TextInput  
                    style={InputStyle}
                    placeholder={"Descripción"}
                    value={filtros.description}
                    placeholderTextColor="gray"
                    onChangeText={(value) => {setFiltros({...filtros,'description':value})}}/>
                    

                    <View style={{flexDirection:'row', justifyContent:'center',marginBottom:10}}>
                        
                        <TouchableOpacity  style={bottonStyle} onPress={onPressButton}>
                            
                            <Text style={{color:Colors.WHITE}}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={onSubmit} 
                            style={[bottonStyle,{backgroundColor:Colors.RED}] }>
                            <Text style={{color:Colors.WHITE}}>Reportar</Text>
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
