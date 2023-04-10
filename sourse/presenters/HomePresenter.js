import { async } from "@firebase/util";
import AppConstants from "../constants/AppConstants";
import { getFirebaseImage } from '../utils/FirebaseHandler';

import axios from "axios";


export async function getEventsByCategories(setEvents,name, eventType,taglist ){
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
                let date = jsonResponse.data.message[i].dateEvent.split('-');
                let day = parseInt(date[2]) ;
                let month = parseInt(date[1]);
                Events.push({
                    eventId: jsonResponse.data.message[i]._id.$oid,
                    eventName: jsonResponse.data.message[i].name,
                    dateEvent: jsonResponse.data.message[i].dateEvent,
                    attendance:jsonResponse.data.message[i].attendance ,
                    tags: jsonResponse.data.message[i].tags,
                    image: imageURI,
                    eventType: jsonResponse.data.message[i].eventType,
                    day: day,
                    month: month
                });
            }
        }
    }  
    setEvents(Events)  
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