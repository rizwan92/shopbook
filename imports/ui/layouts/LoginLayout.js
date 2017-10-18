import React, { Component } from 'react';
import {withRouter } from 'react-router-dom'
import { Session } from 'meteor/session';
import ShopApi from '../../api/shop';

class LoginLayout extends Component {
  constructor() {
    super();
    this.state={
      email:'',
      password:'',
      rname:'',
      rmobile:'',
      remail:'',
      rpassword:'',
      rconfirmPassword:'',
      lat:'',
      long:'',
      addr:'',
      country:'',
      states:'',
      city:'',
      pc:'',
          }
  }
  handleSubmit(event) {
     event.preventDefault();
     const email = this.state.email.trim();
     const password = this.state.password.trim();
      const router=this;

      Meteor.call('user.check',email,password,(err,res)=>{
        if (res) {
            Bert.alert( 'succefull logged in', 'success', 'growl-top-right' );
            Session.setPersistent('user', res)
            Meteor.call('shop.check',Session.get('user')._id,function (error,result){
              if (result) {
                Session.setPersistent('shop', result)
              }else {
              }
            });
             router.props.history.push('/')
        }
      }
    )
     this.setState({
       password:'',
     });
   }
   setValue(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
  }
  handleRSubmit(event) {
     event.preventDefault();
     const name = this.state.rname.trim();
     const number =this.state.rmobile.trim();
     const email = this.state.remail.trim();
     const password = this.state.rpassword.trim();
     const rconfirmPassword = this.state.rconfirmPassword.trim();
     const lat = this.state.lat;
     const long = this.state.long;
     const addr = this.state.addr.trim();
     const country = this.state.country.trim();
     const states = this.state.states.trim();
     const city = this.state.city.trim();
     const pc = this.state.pc.trim();
      if (password === rconfirmPassword) {

        Meteor.call('user.check',email,password ,(error,result)=>{
          if (result) {
             Bert.alert( 'Email already Exist', 'danger', 'growl-top-right' );
          }else {
            const user={
              name,email,number,password,image:'',lat,long,addr,country,states,city,pc
            }
            Meteor.call('user.insert',user,(er,res)=>{
              if (!er) {
                var belowCard = $('.below'),
                    aboveCard = $('.above'),
                    parent = $('.login-container');
                parent.addClass('animation-state-1');
                setTimeout(function () {
                  belowCard.removeClass('below');
                  aboveCard.removeClass('above');
                  belowCard.addClass('above');
                  aboveCard.addClass('below');
                  setTimeout(function () {
                    parent.addClass('animation-state-finish');
                    parent.removeClass('animation-state-1');
                    setTimeout(function () {
                      aboveCard.addClass('turned');
                      belowCard.removeClass('turned');
                      parent.removeClass('animation-state-finish');
                    }, 300);
                  }, 10);
                }, 300);
                Bert.alert( `Successfull Registered`, 'success', 'growl-top-right' );
              }
            });
          }
        });
    }else {
      Bert.alert( `password doesn't match`, 'danger', 'growl-top-right' );

    }
     this.setState({
       rpassword:'',
       rconfirmPassword:'',
  });
  }

  componentWillMount(){


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
             Bert.alert( `${errr.message}`, 'danger', 'growl-top-right' );
           })
      } else {
          Bert.alert( `Geolocation is not supported by this browser.`, 'danger', 'growl-top-right' );
      }
    }


    initMap =() => {
      that= this;
      var input = document.getElementById('pac-input');
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

  componentDidMount(){

    window.initMap = this.initMap;
        $(document).on('click', '.below', function () {
        var belowCard = $('.below'),
            aboveCard = $('.above'),
            parent = $('.login-container');
        parent.addClass('animation-state-1');
        setTimeout(function () {
          belowCard.removeClass('below');
          aboveCard.removeClass('above');
          belowCard.addClass('above');
          aboveCard.addClass('below');
          setTimeout(function () {
            parent.addClass('animation-state-finish');
            parent.removeClass('animation-state-1');
            setTimeout(function () {
              aboveCard.addClass('turned');
              belowCard.removeClass('turned');
              parent.removeClass('animation-state-finish');
            }, 300);
          }, 10);
        }, 300);
        });
        $(document).on('click', '.belowchange', function () {
        var belowCard = $('.below'),
            aboveCard = $('.above'),
            parent = $('.login-container');
        parent.addClass('animation-state-1');
        setTimeout(function () {
          belowCard.removeClass('below');
          aboveCard.removeClass('above');
          belowCard.addClass('above');
          aboveCard.addClass('below');
          setTimeout(function () {
            parent.addClass('animation-state-finish');
            parent.removeClass('animation-state-1');
            setTimeout(function () {
              aboveCard.addClass('turned');
              belowCard.removeClass('turned');
              parent.removeClass('animation-state-finish');
            }, 300);
          }, 10);
        }, 300);
        });
  }
  handleAddr(e){
    this.setState({addr:e.target.value})
  }

  render(){
   return (
     <div className="mylogin-container">
     <div id="particle-canvas"></div>

        <div className="login-container">

          <div className="container elevation-2 center log-in-card below turned">
            <div className="card-body">
              <div className="belowchange">Login?</div>
              <h2>Sign up</h2>
              <form onSubmit={this.handleRSubmit.bind(this)}>
              <div>
              <label htmlFor="username" className="input-label">Name</label>
              <input type="text" className="input" placeholder="" required value={this.state.rname}  onChange={this.setValue.bind(this, 'rname')} />

                <label htmlFor="username" className="input-label">email</label>
                <input type="email" className="input" placeholder="" required value={this.state.remail}  onChange={this.setValue.bind(this, 'remail')}/>

                <label htmlFor="username" className="input-label">Mobile No.</label>
                <input type="number" className="input" placeholder="" required value={this.state.rmobile}  onChange={this.setValue.bind(this, 'rmobile')}/>

                <label htmlFor="username" className="input-label">Address</label>
                <input type="text" className="input" id="pac-input" value={this.state.addr}  onChange={this.handleAddr.bind(this)} required />


                <label htmlFor="username" className="input-label">password</label>
                <input type="password" className="input" required value={this.state.rpassword}  onChange={this.setValue.bind(this, 'rpassword')}/>

                <label htmlFor="username" className="input-label">retype your password</label>
                <input type="password" className="input" required value={this.state.rconfirmPassword}  onChange={this.setValue.bind(this, 'rconfirmPassword')}/>
              </div>
              <div style={{marginTop:'auto'}}>
                <button className="submit sign-up-submit" type="submit">sign up</button>
              </div>
              </form>
            </div>
          </div>

          <div className="container elevation-3 center above sign-up-card">

            <div className="card-body">
            <div className="belowchange">Signup?</div>
              <h2>Login</h2>
              <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                <label htmlFor="username" className="input-label">email</label>
                <input type="email" className="input" placeholder=""  value={this.state.email}  onChange={this.setValue.bind(this, 'email')} required />
                <label htmlFor="username" className="input-label">password</label>
                <input type="password" className="input"  value={this.state.password}  onChange={this.setValue.bind(this, 'password')} required />
              </div>
              <div style={{marginTop:'auto'}}>
                <button className="submit log-in-submit" type="submit">log in</button>
              </div>
              </form>
            </div>
          </div>
        </div>
     </div>
   )
 }
}
export default withRouter(LoginLayout);
