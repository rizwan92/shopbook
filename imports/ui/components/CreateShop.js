import React, { Component } from 'react';
import { Session } from 'meteor/session';
import {CityApi} from '../../api/city';
import {StateApi} from '../../api/state';

export default class AddProduct  extends Component {
  constructor() {
    super();
    this.state={
      sname:'',
      sadd:'',
      scode:'',
      stateid:'',
      cityid:'',
      states:[],
      city:[],
      lat:'',
      long:'',
          }
  }
  handleRSubmit(event) {
    event.preventDefault();
    const sname = this.state.sname.trim();
    const stateid = this.state.stateid.trim();
    const cityid = this.state.cityid.trim();
    const sadd = this.state.sadd.trim();
    const scode = this.state.scode.trim();
    const lat = this.state.lat
    const long = this.state.long
      if (Session.get('user')._id) {
        let shop ={
          userid:Session.get('user')._id,userdetail:Session.get('user'),sname,stateid,cityid,sadd,scode,image:'',lat,long
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
                  stateid:'',
                  cityid:'',
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

  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("city");
    Meteor.subscribe("state");
    let States = StateApi.find().fetch();
    let City = CityApi.find().fetch();
    this.setState({
            states:States,
              city:City
            });
  });
 }
  componentWillUnmount() {
  this.linktracker.stop();
  }

  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
  render(){
    return(
       <div>
         <div className="addproduct-container">
           <h2>Create Your Shop</h2>
           <form onSubmit={this.handleRSubmit.bind(this)}>
           <div>

           <label htmlFor="username" className="input-label">Shop Name</label>
           <input type="text" className="input" placeholder="" required value={this.state.sname}  onChange={this.setValue.bind(this, 'sname')} />

           <label htmlFor="username" className="input-label">Select State</label>
           <select className="myselect"  value={this.state.stateid}  onChange={this.setValue.bind(this, 'stateid')} required>
           <option value=""></option>
             {this.state.states.map((state, i) =>
             <option key={i} value={state._id}>{state.name}</option>
             )}
           </select>

           <label htmlFor="username" className="input-label">Select Place</label>
           <select className="myselect"  value={this.state.cityid}  onChange={this.setValue.bind(this, 'cityid')} required>
           <option value=""></option>
             {this.state.city.map((state, i) =>{
               if (state.stateid == this.state.stateid) {

                 return <option key={i} value={state._id}>{state.name}</option>
               }
             }
             )}
           </select>


           <label htmlFor="username" className="input-label">Shop Address</label>
           <input type="text" className="input" placeholder="" required value={this.state.sadd}  onChange={this.setValue.bind(this, 'sadd')} />

           <label htmlFor="username" className="input-label">Shop Code/GSTIN</label>
           <input type="text" className="input" placeholder="" required value={this.state.scode}  onChange={this.setValue.bind(this, 'scode')}/>


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
