import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class AddProduct  extends Component {
  constructor() {
    super();
    this.state={
      sname:'',
      sadd:'',
      scode:'',
      lat:'',
      long:'',
      country:'',
      states:'',
      city:'',
      pc:'',
          }
  }
  handleRSubmit(event) {
    event.preventDefault();
    const sname = this.state.sname.trim();
    const sadd = this.state.sadd.trim();
    const scode = this.state.scode.trim();
    const lat = this.state.lat;
    const long = this.state.long;
    const country = this.state.country.trim();
    const states = this.state.states.trim();
    const city = this.state.city.trim();
    const pc = this.state.pc.trim();

      if (Session.get('user')._id) {
        let shop ={
          userid:Session.get('user')._id,userdetail:Session.get('user'),sname,sadd,scode,image:'',lat,long,country,states,city,pc
        }
        Meteor.call('shop.check',Session.get('user')._id,(err,res)=>{
          if (res) {
            Bert.alert( 'already exist shop', 'danger', 'growl-top-right' );
          }else {
            Meteor.call('shop.insert',shop,(error,result)=>{
              if (!error) {
                Bert.alert( 'Shop Created Successfully', 'success', 'growl-top-right' );
                Session.setPersistent('shop', shop);
                this.props.closeModal();
                this.setState({
                  sname:'',
                  sadd:'',
                  scode:'',
                })
              }
            })
          }
        })

      }else {
        Bert.alert( 'you are not logged in or ', 'danger', 'growl-top-right' );
      }

  }

  componentWillMount() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({
              lat:position.coords.latitude,
              long:position.coords.longitude,
            });
           })
      } else {
          Bert.alert( `Geolocation is not supported by this browser.`, 'danger', 'growl-top-right' );
      }
     }

 initMap =() => {
   if (!window.google) {
     return false;
   }

   that= this;
   var input = document.getElementById('pac-input1');
   var autocomplete = new google.maps.places.Autocomplete(input);
   autocomplete.addListener('place_changed', function() {
     var place = autocomplete.getPlace();
     if (place.geometry) {
       if (that.state.lat === '' || !that.state.long === '') {
         that.setState({lat:place.geometry.location.lat(),long:place.geometry.location.lng()},()=>{
           Bert.alert( `Got the Autocomplete Cordinates`, 'success', 'growl-top-right' );
         })
       }
    }else {
      Bert.alert( `Autocomplete dint get your cordinates type your full address`, 'danger', 'growl-top-right' );
    }
    if (place.address_components) {
       let route = "";
       let locality = "";
       let sublocality = "";
       let aal2 = "";
       let aal1 = "";
       let country = "";
       let pc = "";
       place.address_components.find((place)=>{
         if (place.types[0] === "route") {
            route = place.long_name;
         }
         if (place.types[0] === "sublocality_level_1") {
            sublocality = place.long_name;
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

       let addr= `${route} ${sublocality} ${locality} ${aal2} ${aal1} ${country} ${pc}`;
       that.setState({
         country,
         states:aal1,
         city:aal2,
         sadd:addr,
         pc,
       })
     }
         })
}
componentDidMount(){

}
  componentWillUnmount() {
  }

  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 handleAddr(e){
   this.setState({sadd:e.target.value})
 }
  render(){
    this.initMap();
    return(
       <div>
         <div className="addproduct-container">
           <h2>Create Your Shop</h2>
           <form onSubmit={this.handleRSubmit.bind(this)}>
           <div>

           <label htmlFor="username" className="input-label">Shop Name</label>
           <input type="text" className="input" placeholder="" required value={this.state.sname}  onChange={this.setValue.bind(this, 'sname')} />


           <label htmlFor="username" className="input-label">Shop Address</label>
           <input type="text" className="input" placeholder="" id="pac-input1" required value={this.state.sadd}  onChange={this.handleAddr.bind(this)}  />

           <label htmlFor="username" className="input-label">Shop Code/GSTIN</label>
           <input type="text" className="input" placeholder=""  value={this.state.scode}  onChange={this.setValue.bind(this, 'scode')}/>


           </div>
           <div style={{marginTop:'auto'}}>
             <button className="submit sign-up-submit" type="submit">Submit</button>
           </div>
           </form>
         </div>
       </div>
    );
  }
}
