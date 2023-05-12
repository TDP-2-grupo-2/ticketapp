import React, { useState } from 'react'
import { View,Text, ScrollView, TextInput } from 'react-native'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { CategoryList } from '../components/CategoryList';
import Colors from '../constants/Colors';

import { ProfileHeader } from '../components/ProfileHeader';
import { SearchFilter } from '../components/SearchFilter';
import { ListSearchCards } from '../components/ListSearchCards';


const categories = ['CONFERENCIA','CONCIERTO','TEATRO','SHOW','CINE', 'OTRO'];
//const categories = [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}];
export const Home = (navigation) => {
 //   const [categories, setCategories] = useState( [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}])

    const [filtros, setFiltros] = useState({
        'name':null,
        'eventType':null,
        'taglist':null,
        'cordinates': '-34.499667,-58.494262',
        'range':'0,500'
    })
    const onSubmitFilters = (name, eventType, taglist, range) => {

        setFiltros({
            'name':name,
            'eventType':eventType,
            'taglist':taglist,
            'cordinates': '-34.499667,-58.494262',
            'range':range
        });
        //console.log(filtros)
    }

  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
        <View style={{marginHorizontal: 18, marginBottom:'10%'}}>
           
        <ProfileHeader></ProfileHeader>
        <SearchFilter onSubmitFilters = {onSubmitFilters}></SearchFilter>

            <ScrollView style={{marginBottom:'40%',}}>
                {
                (filtros.name || filtros.eventType)?
                <ListSearchCards filtros ={filtros}></ListSearchCards>
                :
                categories.map(category => <CategoryList key={category} filtros ={filtros}  category = {category}/>)
                }
            </ScrollView>
        </View>
                    
        
    </View>
  )
}
