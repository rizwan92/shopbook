import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/header/Header';
import Search from '../components/Search';
import ShopCard from '../components/ShopCard';
import {ShopApi} from '../../api/shop';

export default class NearByLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops:[],
      lat:'',
      long:'',
      mybutton:true,
      distance:5,
    }
  }

  componentWillMount() {
   navigator.permissions.query({
        name: 'geolocation'
    }).then(function(result) {
        if (result.state == 'granted') {
        } else if (result.state == 'prompt') {
         } else if (result.state == 'denied') {
              }
        result.onchange = function() {
        }
    });

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position)=>{
           this.setState({
             lat:position.coords.latitude,
             long:position.coords.longitude,
           },()=>{
             Bert.alert( `Got the Cordinates`, 'success', 'growl-top-right' );
           });
          },(errr)=>{
            Bert.alert( `${errr.message}`, 'danger', 'growl-top-right' );
          },{
             enableHighAccuracy: true,
             maximumAge: Infinity
          })
     } else {
         Bert.alert( `Geolocation is not supported by this browser.`, 'danger', 'growl-top-right' );
     }
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("shop");
    let shops = ShopApi.find({}).fetch();
    this.setState({shops});
  });
}
componentWillUnmount() {
this.linktracker.stop();
}
componentDidMount(){
  window.initMap = this.initMap;
}
initMap =() => {
  that= this;
  var input = document.getElementById('pac-input3');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      // if (that.state.lat == "" || that.state.long == "") {
        that.setState({lat:place.geometry.location.lat(),long:place.geometry.location.lng()},()=>{
          Bert.alert( `Got the Autocomplete Cordinates`, 'success', 'growl-top-right' );
        })
      // }
   }else {
     Bert.alert( `Autocomplete dint get your cordinates type your full address`, 'danger', 'growl-top-right' );
   }
   if (place.address_components) {
      let route = "";
      let ocality = "";
      let aal2 = "";
      let aal1 = "";
      let country = "";
      let pc = "";
      place.address_components.find((place)=>{
        if (place.types[0] === "route") {
           route = place.long_name;
        }
          if (place.types[0] === "locality") {
             locality = place.long_name;
          }
          if (place.types[0] === "administrative_area_level_2") {
             aal2 = place.long_name;
          }
          if (place.types[0] === "administrative_area_level_1") {
             aal1 = place.long_name;
          }
          if (place.types[0] === "country") {
             country = place.long_name;
          }
          if (place.types[0] === "postal_code") {
             pc = place.long_name;
          }
      })

      let addr= `${route} ${locality} ${aal2} ${aal1} ${country} ${pc}`;
      that.setState({
        country,
        state:aal1,
        city:aal2,
        addr,
        pc,
      })
    }
        })
}

  changeDistance(distance){
    this.setState({distance})
  }

handleClick(){
  this.setState({mybutton:false});
}
  render() {
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
    function rad (x) { return x * Math.PI / 180 }
    function haversine(p1, p2) {
     var R = 6371
     var dLat  = rad(p2.lat - p1.lat)
     var dLong = rad(p2.lng - p1.lng)
     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2)
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
     var d = R * c
     return Math.round(d)
   }
    let nearbyshops = this.state.shops.filter((shop)=>{
      if (this.state.lat && this.state.long) {
        let latLngA = {lat:  parseFloat(this.state.lat), lng:parseFloat(this.state.long)}
        let latLngB = {lat:  parseFloat(shop.lat), lng:parseFloat(shop.long)}
        if ( haversine(latLngA, latLngB) <= parseFloat(this.state.distance)) {
          return (shop.distance=distance(this.state.lat,this.state.long,shop.lat,shop.long).toFixed(2));
        }
      }

    })
    return (
      <div>
      <Header name="Shopbook" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">

          <div className="mainlayout-search">
            <Search changeDistance={this.changeDistance.bind(this)}/>
          </div>

          <h3 className="myhomeTitle">Welcome to the Shop Book Here You Can Direclty Connect With Your Near Local Shops, Retail Store and Business</h3>

            <div className="card">
              {
                nearbyshops.length == 0 ?
                <div>No Shops Available Near Your Area Right Now</div>
                    :
                    <div className="card">
                    {
                nearbyshops.map((product,i)=>{
                  return(
                    <NavLink key={i} to={`/shop/${product._id}`}>
                    <ShopCard   product={product} isAdmin={false} isNearBy={true}/>
                    </NavLink>
                  )
                })
              }
                </div>
              }
            </div>

          </div>
          <div className="mainlayoutthree"></div>
        </div>
      </div>
    )
  }
}
