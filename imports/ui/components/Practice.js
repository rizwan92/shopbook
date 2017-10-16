import React, { Component } from 'react';
export default class Practice  extends Component {
  constructor() {
    super();
  }


  render(){
    const data =[
      {username:'nbdt',locationname:'me',lat:21.254615299999998,long:81.6361071},
      {username:'rohit',locationname:'rohit',lat:21.244603,long:81.638498},
      {username:'pratyusha',locationname:'didwaniya regency',lat:21.2370654,long:81.5889985},
      {username:'saurabh chawda',locationname:'jail road sai nagar',lat:21.2557518,long:81.639974},
    ]

    function distance(lat1, lon1, lat2, lon2, unit) {
    	var radlat1 = Math.PI * lat1/180
    	var radlat2 = Math.PI * lat2/180
    	var theta = lon1-lon2
    	var radtheta = Math.PI * theta/180
    	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    	dist = Math.acos(dist)
    	dist = dist * 180/Math.PI
    	dist = dist * 60 * 1.1515
    	if (unit=="K") { dist = dist * 1.609344 }
    	if (unit=="N") { dist = dist * 0.8684 }
    	return dist
    }
      // console.log(data[1].username + " is " + distance(data[0].lat,data[0].long,data[1].lat,data[1].long, "k").toFixed(2) + " km from " + data[0].username);
      // console.log(data[2].username + " is " + distance(data[0].lat,data[0].long,data[2].lat,data[2].long, "k").toFixed(2) + " km from " + data[0].username);
      // console.log(data[3].username + " is " + distance(data[0].lat,data[0].long,data[3].lat,data[3].long, "k").toFixed(2) + " km from " + data[0].username);
      return(
       <div>
       <center >
        <h1>Distance of trainee from nbdt</h1>
        {
          data.map((dat,i)=>{
            if (distance(21.254615299999998,81.6361071,dat.lat,dat.long, "k").toFixed(2) <= 4) {

              return(
                <h2 key={i}>{dat.username + " is " + distance(21.254615299999998,81.6361071,dat.lat,dat.long, "k").toFixed(2) + " km from Nbdigitech " }</h2>
              )

            }

          })
        }
        </center>
       </div>
    );
  }
}
