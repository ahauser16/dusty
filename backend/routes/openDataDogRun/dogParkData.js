const axios = require("axios");
const fs = require("fs");

axios
  .all([
    axios.get("https://data.cityofnewyork.us/resource/hxx3-bwgv.json"),
    axios.get("https://data.cityofnewyork.us/resource/5npv-j6gn.json"),
    axios.get("https://data.cityofnewyork.us/resource/wswf-9pts.json"),
    axios.get("https://data.cityofnewyork.us/resource/nu7n-tubp.json"),
  ])
  .then(
    axios.spread(function (
      dogRunData,
      poopBagLoc,
      covidClosureStatus,
      dogLicenseData
    ) {
      let data = {};

      //this dog run data set has not been updated since April 29, 2019
      //instead of this dataset use the data and geometry from Parks Closure Status Due to COVID-19: Dog Runs which has been (so far) updated daily.
      //After covid this may change.
      data.dogRuns = dogRunData.data.map((elem) => ({
        name: elem.name,
        geometry: elem.the_geom,
        status: elem.featuresta,
      }));
      //=========CONCEPTUAL ASIDE==============
      // let data = dogRunData.data.map(function (elem){
      //   return {
      //   name: elem.name,
      //   geometry: elem.the_geom,
      //   status: elem.featuresta,
      // }});
      //=========CONCEPTUAL ASIDE==============

      data.poopBags = poopBagLoc.data.map((elem) => ({
        bagLocation: elem.location,
        bagGeom: elem.point,
        bagPropertyName: elem.propertyname,
      }));
      data.covidClosureStatus = covidClosureStatus.data.map((elem) => ({
        dogRunBorough: elem.borough,
        dogRunPropertyName: elem.propertyname,
        dogRunName: elem.name,
        dogRunGeom: elem.polygon,
      }));
      data.dogLicenseData = dogLicenseData.data.map((elem) => ({
        dogName: elem.animalname,
        dogGender: elem.animalgender,
        dogBirthYear: elem.animalbirth,
        dogBreedName: elem.breedname,
        dogZipcode: elem.zipcode,
      }));
      // console.log(data.poopBags);
      // console.log(dogLicenseData);
      // console.log(covidClosureStatus);

      // 'data' is our json data
      // console.log(data);

      //parse json
      // var jsonObj = JSON.parse(data);
      // console.log(jsonObj);

      // jsonContent = JSON.stringify(data);

      // fs.writeFile("dogRunData.json", data, "utf8", function (err) {
      //   if (err) {
      //     console.log("An error occured while writing JSON object to file");
      //     return console.log(err);
      //   }
      //   console.log("JSON file has been saved");
      // });
    })
  );
