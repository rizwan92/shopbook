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
           });
           Bert.alert( `Got the Cordinates`, 'success', 'growl-top-right' );
          },(errr)=>{
            Bert.alert( `${errr}`, 'danger', 'growl-top-right' );
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
    let nearbyshops = this.state.shops.filter((shop)=>{
      if (distance(this.state.lat,this.state.long,shop.lat,shop.long,"K").toFixed(2)<= 2) {
        return (shop.distance=distance(this.state.lat,this.state.long,shop.lat,shop.long).toFixed(2));
      }
    })
    return (
      <div>
      <Header name="SocialShop" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">



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

          </div>
          <div className="mainlayoutthree"></div>
        </div>
      </div>
    )
  }
}
