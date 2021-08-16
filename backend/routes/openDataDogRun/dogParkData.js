const axios = require("axios");

axios
  .all([
    axios.get("https://data.cityofnewyork.us/resource/hxx3-bwgv.json"),
    axios.get("https://data.cityofnewyork.us/resource/5npv-j6gn.json"),
    axios.get('https://data.cityofnewyork.us/resource/wswf-9pts.json'),
    axios.get('https://data.cityofnewyork.us/resource/nu7n-tubp.json')
  ])
  .then(
    axios.spread(function (
      dogRunData,
      poopBagLoc,
      covidClosureStatus,
      dogLicenseData
    ) {
      let data = {};
      data.dogRuns = dogRunData.data.map((elem) => ({
        name: elem.name,
        geometry: elem.the_geom,
        status: elem.featuresta,
      }));
      // let data = dogRunData.data.map(function (elem){
      //   return {
      //   name: elem.name,
      //   geometry: elem.the_geom,
      //   status: elem.featuresta,
      // }});
      data.poopBags = poopBagLoc.data.map((elem) => ({
        location: elem.location,
        point: elem.point,
        propertyName: elem.propertyname,
      }));

      // console.log(data.poopBags);

      // console.log(poopBagLoc.data[0].point);
      // console.log(covidClosureStatus);
      console.log(dogLicenseData);
    })
  );

// https://data.cityofnewyork.us/resource/hxx3-bwgv.json
// https://github.com/axios/axios/blob/master/examples/all/index.html

// TODO:
// 1- loop through response.data in order to access each dog park's properties.
// 2- export each dog park's properties to the namespace class(or maybe to namespaces?).
// 3- dynamically create namespaces using dog park data.

//
