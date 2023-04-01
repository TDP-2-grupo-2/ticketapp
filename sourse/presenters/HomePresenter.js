export async function getEventsByCategories(categories){
    // const paramsGet = {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     categories: categories
    // };
    // const url = `${AppConstants.API_URL}/eventsCategories`;
    // const response = await fetch(
    //     url,
    //     paramsGet
    // );
    // const jsonResponse = await response.json();
    //const Events = [];
    // if (response.status === 200){
    //     if(!jsonResponse.status_code){
            
    //         for(let i=0; i<jsonResponse.length; i++){
    //             categoriesArray.push({
    //                 _id: jsonResponse[i]._id.$oid,
    //                 id: jsonResponse[i].key,
    //                 nameCategory: jsonResponse[i].name,
    //                 image: jsonResponse[i].photos ? jsonResponse[i].photos[0] : null,
    //                 isoStringDate: jsonResponse[i].eventDates[0],
    //                 date: `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`,
    //                 time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
    //                 location: jsonResponse[i].location,
    //                 description: jsonResponse[i].description,
    //                 price: jsonResponse[i].price,
    //                 owner: jsonResponse[i].owner,
    //                 image: imageURI,
    //                 isFav: jsonResponse[i].is_favourite,
    //             });
    //         }
    //     }
    // }  
    const Events = [{eventId:'2312dssa4' , eventName: 'Imagine Dragons', date: '27/12/2022', otherCategories: ['ROCK','DANCE' ] , imageURI:'sadsadsaa'} ]
    return Events;   
}

export async function getFireBaseImage(image_path, setImage){
    let imageURI;
    try{
        imageURI = await getFirebaseImage("files/"+image_path);
    }catch(exception){
        //Image not available
        imageURI = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png";
    }
    setImage(imageURI)
}