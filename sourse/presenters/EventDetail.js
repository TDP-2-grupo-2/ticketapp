import AppConstants from "../constants/AppConstants";
import { getFirebaseImage } from '../utils/FirebaseHandler';
import axios from "axios";


export async function getEvent(setEvents,eventId ){
    const jsonResponse = await axios.get(
        `${AppConstants.API_URL}/events/${eventId}`,
    );
    const Events = [];
    if (jsonResponse.status === 200){
        if(!jsonResponse.status_code){
                let imageURI;
                
                    try{
                        imageURI = await getFirebaseImage("files/"+jsonResponse.data.message.photos[0]);
                    }catch(exception){
                        console.log(exception)
                        //Image not available
                        imageURI = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png";
                    }
                let tags = [];
                if (jsonResponse.data.message.tags){
                    
                    // for(let j=0; j<jsonResponse.data.message.tags.length; j++){
                    //     console.log(jsonResponse.data.message.tags[j])
                    //     tags.push(jsonResponse.data.message.tags[j]);
                    // }
                }
                let startTime = jsonResponse.data.message.start.split(':');
                startTime = startTime[0]+ ':'+ startTime[0];
                let endTime = jsonResponse.data.message.end.split(':');
                endTime = endTime[0]+ ':'+ endTime[0];

                let date = jsonResponse.data.message.dateEvent.split('-');
                let day = parseInt(date[2]) ;
                let month = parseInt(date[1]);
                setEvents({
                    eventId: jsonResponse.data.message._id.$oid,
                    eventName: jsonResponse.data.message.name,
                    owner: jsonResponse.data.message.owner,
                    description: jsonResponse.data.message.description,
                    locationDescription: jsonResponse.data.message.locationDescription,
                    
                    capacity: jsonResponse.data.message.capacity,
                    dateEvent: jsonResponse.data.message.dateEvent,
                    attendance:jsonResponse.data.message.attendance ,
                    tags: jsonResponse.data.message.tags,
                    
                    image: imageURI,
                    eventType: jsonResponse.data.message.eventType,
                    faqs:jsonResponse.data.message.faqs,
                    latitud: jsonResponse.data.message.latitud,
                    longitud: jsonResponse.data.message.longitud,
                    start: startTime,
                    end: endTime,
                    day:day,
                    month:month


        });
            
        }
    }
    
}