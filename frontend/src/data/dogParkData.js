import React, { useEffect, useState } from 'react'
const axios = require("axios");

export default function openDataCall(){

  fetch('https://data.cityofnewyork.us/resource/wswf-9pts.json')
  .then(response => response.json())
  .then(data => console.log(data));




}


axios
  .all([
    // axios.get("https://data.cityofnewyork.us/resource/hxx3-bwgv.json"),
    axios.get("https://data.cityofnewyork.us/resource/5npv-j6gn.json"),
    axios.get("https://data.cityofnewyork.us/resource/wswf-9pts.json"),
    axios.get("https://data.cityofnewyork.us/resource/nu7n-tubp.json"),
  ])
  .then(
    axios.spread(function (
      poopBagLoc,
      covidClosureStatus,
      dogLicenseData
    ) {
      let data = {};

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
    })
  );
