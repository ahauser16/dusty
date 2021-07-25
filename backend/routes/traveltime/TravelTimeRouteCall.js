//TODO: refactor this into separate frondend and backend files e.g. remove react syntax, use express and traveltime npm package syntax.

import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { myEnvVars } from '../../env';


function getDateString() {
    let d = new Date();
    return d.toISOString();
}

export default function TravelTimeRouteCall(position) {

console.log(position.lat);
console.log(position.lng)

    const [posts, setPosts] = useState([]);

    const myTravelData = {
        "locations": [
            {
                "id": "home",
                "coords": {
                    //ISSUE: cannot properly reference geolocation.  How would you reference lat&lng here as the values in Map.js-lines 21&22                    
                    "lat": position.lat,
                    "lng": position.lng
                }
            },
        ],
        "departure_searches": [{
            "id": "WhereWoof",
            "departure_location_id": "home",
            "arrival_location_ids": [],
            "transportation": { "type": "walking" },
            "departure_time": getDateString(),
            "properties": ["travel_time", "distance", "route"]
        }]
    };
    //===================new code below===================
    // arrivalLatLngs.forEach((point, index) => {
    //     let id = "arrival" + index;
    //     data.locations.push({
    //         "id": id,
    //         "coords": {
    //             "lat": point.lat,
    //             "lng": point.lng
    //         }
    //     });
    //     data.departure_searches[0].arrival_location_ids.push(id);
    // });
    //===================new code above======================

    //===================old code below======================


    async function fetchData(url, data, params) {
        const response = await axios.post(url, data, params);
        console.log(response.data.results)
        return response.data.results
    }

    //DRAWROUTE FUNCTION WOULD RUN AT THIS POINT

    useEffect(() => {
        let url = 'https://api.traveltimeapp.com/v4/routes'
        const params = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Application-Id': myEnvVars.TRAVELTIMEAPPID,
                'X-Api-Key': myEnvVars.TRAVELTIMEAPIKEY
            }
        }

        // commented out below to avoid unnecessary api calls

        // const travelData = fetchData(url, myTravelData, params);
        // console.log(travelData)
        // travelData.then((res) => {
        //     console.log(res);
        //     setPosts((posts) => {
        //         return [...posts, ...res]
        //     })
        // })

        // commented out above to avoid unnecessary api calls

    }, [])

    return (
        <div>
            {/* {JSON.stringify(posts)} */}
        </div>
    )
}
