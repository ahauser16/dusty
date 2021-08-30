import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import List from "./components/Dogrunlist";
import WithDogRunListLoading from "./components/withDogRunListLoading";
const axios = require("axios");

function App() {
  const ListLoading = WithDogRunListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    dogruns: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://data.cityofnewyork.us/resource/wswf-9pts.json`;
    axios.get(apiUrl).then((dogruns) => {
      const allDogruns = dogruns.data;
      console.log(dogruns.data);
      setAppState({ loading: false, dogruns: allDogruns });
    });
  }, [setAppState]);

  return (

    <>

      <div className="App">
        <div className="dogrun-container" >
          {/* <ListLoading
            isLoading={appState.loading}
            dogruns={appState.dogruns}
          /> */}
        </div>
      </div>

      <MapContainer
        viewport={{}}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution="<a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
export default App;

// import React from "react";
// import { MapContainer, TileLayer } from "react-leaflet";

// function App() {

//   return (
//       <MapContainer
//         viewport={{}}
//         center={[51.505, -0.09]}
//         zoom={13}
//         scrollWheelZoom={true}
//         style={{ height: "100vh", width: "100%" }}
//       >
//         <TileLayer
//           attribution="<a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//   );
// }

// export default App;
