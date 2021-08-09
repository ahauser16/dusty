const axios = require("axios");

      axios.all([
        axios.get('https://data.cityofnewyork.us/resource/hxx3-bwgv.json'),
        axios.get('https://data.cityofnewyork.us/resource/5npv-j6gn.json'),
        axios.get('https://data.cityofnewyork.us/resource/wswf-9pts.json'),
        axios.get('https://data.cityofnewyork.us/resource/nu7n-tubp.json')
      ]).then(axios.spread(function (dogRunData, poopBagLoc, covidClosureStatus, dogLicenseData){
        console.log(dogRunData);
        console.log(poopBagLoc);
        console.log(covidClosureStatus);
        console.log(dogLicenseData);
      }));

      // {
      //   document.getElementById('useravatar').src = user.data.avatar_url;
      //   document.getElementById('username').innerHTML = user.data.name;
      //   document.getElementById('orgs').innerHTML = orgs.data.map(function (org) {
      //     return (
      //       '<li class="row">' +
      //         '<img src="' + org.avatar_url + '" class="col-md-1"/>' +
      //         '<div class="col-md-3">' +
      //           '<strong>' + org.login + '</strong>' +
      //         '</div>' +
      //       '</li>'
      //     );
      //   }).join('');
      // }));


// https://data.cityofnewyork.us/resource/hxx3-bwgv.json
// https://github.com/axios/axios/blob/master/examples/all/index.html

// TODO:
// 1- loop through response.data in order to access each dog park's properties.
// 2- export each dog park's properties to the namespace class(or maybe to namespaces?).
// 3- dynamically create namespaces using dog park data.
