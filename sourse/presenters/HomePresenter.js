import { async } from "@firebase/util";
import AppConstants from "../constants/AppConstants";
import { getFirebaseImage } from '../utils/FirebaseHandler';

import axios from "axios";


export async function getEventsByCategories(setEvents,name, eventType,taglist ){
    // const paramsGet = {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     // name: name,
    //     // eventType:eventType,
    //     // taglist:taglist,
    // };


    // const url = `${AppConstants.API_URL}/events/?eventType=${eventType}`;
    // console.log(url)
    // const response = await fetch(
    //     url,
    //     paramsGet
    // );
    // const jsonResponse = await response.json();
    params = {};
    if(name){
        params.name = name;
    }
    if(eventType){
        params.eventType = eventType;
    }
    if(taglist){
        params.taglist = taglist;
    }
    
    const jsonResponse = await axios.get(
        `${AppConstants.API_URL}/events/`,
        {
          params: params
          
        },
    );
    const Events = [];
    if (jsonResponse.status === 200){
        if(!jsonResponse.status_code){
            //console.log(jsonResponse.data.message.length)
            for(let i=0; i<jsonResponse.data.message.length; i++){
                let imageURI;
                
                //console.log(jsonResponse.data.message[i].photos ? jsonResponse.data.message[i].photos[0]: null)
                    try{
                        imageURI = await getFirebaseImage("files/"+jsonResponse.data.message[i].photos[0]);
                    }catch(exception){
                        //Image not available
                        imageURI = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png";
                    }
                let tags = [];
                if (jsonResponse.data.message[i].tags){
                    
                    // for(let j=0; j<jsonResponse.data.message[i].tags.length; j++){
                    //     console.log(jsonResponse.data.message[i].tags[j])
                    //     tags.push(jsonResponse.data.message[i].tags[j]);
                    // }
                }
                
                Events.push({
                    eventId: jsonResponse.data.message[i]._id.$oid,
                   // id: jsonResponse.data.message[i].key,
                    eventName: jsonResponse.data.message[i].name,
                    //imageURI: jsonResponse.data.message[i].photos ? jsonResponse.data.message[i].photos[0] : null,
                    // isoStringDate: jsonResponse.data.message[i].eventDates[0],
                    // date: `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`,
                    // time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
                    //capacity: jsonResponse.data.message[i].capacity,
                    dateEvent: jsonResponse.data.message[i].dateEvent,
                    attendance:jsonResponse.data.message[i].attendance ,
                    tags: jsonResponse.data.message[i].tags,
                    //owner: jsonResponse.data.message[i].owner,
                    image: imageURI,
                    //eventType: jsonResponse.data.message[i].eventType,
                });
            }
        }
    }  
    setEvents(Events)  
}

export async function getEventDetail(){
    
}

export async function getFireBaseImageWithSetImage(image_path, setImage){
    let imageURI;
    try{
        imageURI = await getFireBaseImage(image_path);
    }catch(exception){
        //Image not available
        imageURI = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png";
    }
    setImage(imageURI)
}