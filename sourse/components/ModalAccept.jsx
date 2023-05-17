import React, {useEffect} from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'


const bottonStyle ={
    borderRadius:10,
    
    padding:10,
    paddingHorizontal:20,
    margin:5,
    
}

const ModalStyle = {width:'80%',
                    
                     backgroundColor:Colors.PURPLE,       
                    marginTop:'50%',
                    margin:'10%',
                    borderRadius:20,
                    };


export const ModalAccept = ({toggle, setToggle,type, header, bodyText}) => {

    
  return (
    <Modal visible={toggle} transparent={true} animationType={'fade'} >
                <View style={[ModalStyle,
                                type == 'success' ? successStyle.body: (type == 'error'?cancelStyle.body: defaultStyle.body)
                ]}>
                    <View style={[{borderTopStartRadius:20,paddingVertical:20, borderTopEndRadius:20 },
                                type == 'success' ? successStyle.header: (type == 'error'?cancelStyle.header: defaultStyle.header)
                    ]}>
                        <Text style={{color:Colors.WHITE , 
                            fontSize:28,
                            textAlign:'center',                            
                            }}>{header}</Text>
                    </View>
                    <Text style={{fontSize:18, color:Colors.WHITE, margin:10, textAlign:'center',marginVertical:25  }}>{bodyText}</Text>
                    
                    <View style={{flexDirection:'row', justifyContent:'center',marginBottom:10}}>
                        <TouchableOpacity 
                            onPress={() => {setToggle(false)}} 
                            style={[bottonStyle, type == 'success' ? successStyle.buttom: (type == 'error'?cancelStyle.buttom: defaultStyle.buttom)]}>
                            <Text style={{color:Colors.WHITE}}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Modal>
  )
}

const defaultStyle = StyleSheet.create({
    header: {
        backgroundColor:Colors.PURPLE_LIGTH
    },
    body: {
        backgroundColor:Colors.PURPLE,
    },
    buttom: {
        backgroundColor:Colors.PURPLE_BUTTOM,
    }
  });

  const successStyle = StyleSheet.create({
    header: {
        backgroundColor:Colors.GREEN_LIGTH
    },
    body: {
        backgroundColor:Colors.GREEN,
    },
    buttom: {
        backgroundColor:Colors.GREEN_BUTTOM,
    }
  });

  const cancelStyle = StyleSheet.create({
    header: {
        backgroundColor:Colors.RED
    },
    body: {
        backgroundColor:Colors.RED_LIGTH,
    },
    buttom: {
        backgroundColor:Colors.RED_BUTTOM,
    }
  });
