import React, { useState } from 'react'
import { View,Text, ScrollView, TextInput } from 'react-native'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { CategoryList } from '../components/CategoryList';
import Colors from '../constants/Colors';

import { ProfileHeader } from '../components/ProfileHeader';
import { SearchFilter } from '../components/SearchFilter';
import { ListSearchCards } from '../components/ListSearchCards';


const categories = ['CONCIERTO','TEATRO','SHOW','CINE'];
//const categories = [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}];
export const Home = (navigation) => {
 //   const [categories, setCategories] = useState( [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}])

    const [filtros, setFiltros] = useState({
        'name':null,
        'eventType':null,
        'taglist':null,
    })
    const onSubmitFilters = (name, eventType, taglist) => {

        setFiltros({
            'name':name,
            'eventType':eventType,
            'taglist':taglist,
        });
        console.log(filtros)
    }

  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
        <View style={{marginHorizontal: 18}}>
           
        <ProfileHeader></ProfileHeader>
        <SearchFilter onSubmitFilters = {onSubmitFilters}></SearchFilter>

            <ScrollView style={{marginBottom:'40%'}}>
                {
                (filtros.name || filtros.eventType)?
                <ListSearchCards filtros ={filtros}></ListSearchCards>
                :
                categories.map(category => <CategoryList key={category}  category = {category}/>)
                }
            </ScrollView>
        </View>
                    
        
    </View>
  )
}
