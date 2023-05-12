import React, {useEffect} from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'


const bottonStyle ={
    borderRadius:10,
    backgroundColor:Colors.PURPLE_BUTTOM,
    padding:10,
    paddingHorizontal:20,
    margin:5,
    
}

const ModalStyle = {width:'80%',
                    
                     backgroundColor:Colors.PURPLE,
                    //flex:1,
                    marginTop:'50%',
                    margin:'10%',
                    borderRadius:20,
                    //justifyContent:'center',
                    // height:'80%', 
                    
                    };


export const ModalAccept = ({toggle, setToggle}) => {

    
  return (
    <Modal visible={toggle} transparent={true} animationType={'fade'} >
                <View style={ModalStyle}>
                    <View style={{borderTopStartRadius:20,paddingVertical:20, borderTopEndRadius:20, backgroundColor:Colors.PURPLE_LIGTH }}>
                        <Text style={{color:Colors.WHITE , 
                            
                            fontSize:28,
                            
                            textAlign:'center',
                            }}>¡Genial!</Text>
                    </View>
                    <Text style={{fontSize:18, color:Colors.WHITE, margin:10, alignSelf:'center'}}>Tu entrada ha sido reservada</Text>
                    <Text>{toggle?'true':'falses'}</Text>
                    <View style={{flexDirection:'row', justifyContent:'center',marginBottom:10}}>
                        <TouchableOpacity 
                            onPress={() => {setToggle(false)}} 
                            style={bottonStyle}>
                            <Text style={{color:Colors.WHITE}}>Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Modal>
  )
}
