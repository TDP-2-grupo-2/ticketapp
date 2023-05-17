import AppConstants from "../constants/AppConstants";
import { getFirebaseImage } from '../utils/FirebaseHandler';
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";
import { async } from "@firebase/util";


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
                startTime = startTime[0]+ ':'+ startTime[1];
                let endTime = jsonResponse.data.message.end.split(':');
                endTime = endTime[0]+ ':'+ endTime[1];

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
                    agenda:jsonResponse.data.message.agenda,
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

export async function reserveTicket(userId, eventId,setTicket ){
    const jsonResponse = await axios.post(
        `${AppConstants.API_URL}/events/reservations/user/${userId}/event/${eventId}`,//cambiar x el optener
    )
    .then(function (jsonResponse) {
        setTicket({ticketId: jsonResponse.data.message._id.$oid});
      })
      .catch(function (error) {
        console.log('error')
        // handle error
            setTicket({})
      })
      ;
}

export async function getTicket(userId, eventId, setTicket){
    console.log("consulto");

    const jsonResponse = await axios.get(
        `${AppConstants.API_URL}/events/reservations/user/${userId}/event/${eventId}`,//cambiar x el optener
    )
    .then(function (jsonResponse) {
        //console.log(jsonResponse.data.message._id.$oid);
        let status = jsonResponse.data.message.status;
        switch (status) {
            case 'to_be_used':
                status = "Disponible"
              break;
            case 'suspended':
                status = "Suspendido"
              break;
            case 'canceled':
                status = "Cancelado"
              break;
            case 'used':
                status = "Utilizada"
              break;
            case 'blocked':
                status = "Blockeado"
              break;
            case 'blocked':
                status = "Blockeado"
              break;
          }
        //console.log(jsonResponse.data.message)
        setTicket({ticketId: jsonResponse.data.message._id.$oid,
            eventDate:jsonResponse.data.message.event_date, 
            event_id:jsonResponse.data.message.event_id, 
            event_name:jsonResponse.data.message.event_name, 
            event_start_time:jsonResponse.data.message.event_start_time, 
            status:status
        });
      })
      .catch(function (error) {
        console.log('error')
        // handle error
            setTicket({})
      })
      ;
    

}

export async function getIsFavorite(userId, eventId, setFavorite){
    const jsonResponse = await axios.get(
        `${AppConstants.API_URL}/events/favourites/${eventId}/user/${userId}`,//cambiar x el optener
    );
    if (jsonResponse.status === 200){
        if(!jsonResponse.status_code){
            setFavorite(jsonResponse.data.message) ;
        }
    }
}

export async function pachIsFavorite(userId, eventId, setFavorite){
    const jsonResponse = await axios.patch(
        `${AppConstants.API_URL}/events/favourites/${eventId}/user/${userId}`,//cambiar x el optener
    );
    if (jsonResponse.status === 200){
        if(!jsonResponse.status_code){
            setFavorite(jsonResponse.data.message == "Se agregó como favorito el evento") ;
        }
    }
}

export async function reportEvent(authToken,reportData, setSucces, setError ,setErrorMessagge){
        console.log(reportData.eventId)
        console.log(reportData.reportType)
       // authToken
        console.log(authToken)
        const jsonResponse = await axios.post(
          `${AppConstants.API_URL}/attendees/report/event`,
          {
            event_id:reportData?.eventId,
            reason:reportData?.reportType,
          },{
            headers: {'Authorization': `Bearer ${authToken}`}
          }
      ).then(function (response) {
        // handle success
        setSucces(true)
      })
      .catch(function (error) {
        
        setError(true);
        console.log(error.response.data)
        setErrorMessagge(error.response.data.detail);
    
      })
      
}