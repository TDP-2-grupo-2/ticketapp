import React, { useState } from 'react'
import { View,Text, ScrollView, TextInput } from 'react-native'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { CategoryList } from '../components/CategoryList';
import Colors from '../constants/Colors';




const categories = ['POP', 'STAND UP','MUESTRAS'];
//const categories = [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}];
export const Home = () => {
 //   const [categories, setCategories] = useState( [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}])




  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
        <View style={{marginHorizontal: 18}}>
            <View style={{ justifyContent:'space-between'}}>

            <Text style={{color:Colors.WHITE}}>Argentina</Text>

            <Text style={{color:Colors.WHITE, fontSize:36}}>Explorar</Text>
            </View>
            <View>

            <TextInput
                style={{ fontSize: 18, backgroundColor: "#1D1D1D", padding: 15, width: '90%', margin: 20, borderRadius:15}}
                placeholder={"Search..."}
                placeholderTextColor="gray"/>
                
         
            </View>
            

            <ScrollView>
                {
                //<Text>{categories}</Text>
                // categories.map((category) => <Text style={{color:Colors.WHITE}}>{category}</Text>)
                categories.map(category => <CategoryList key={category}  category = {category}/>)
                }
            </ScrollView>
        </View>
                    
        
    </View>
  )
}
