import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {CityApi} from '../../api/city';
import {StateApi} from '../../api/state';

export default class StatePlace  extends Component {
  constructor() {
    super();
    this.state={
      name:'',
      code:'',
      cname:'',
      stateid:'',
      states:[],
          }
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 componentWillMount() {
 this.linktracker = Tracker.autorun(() => {
   Meteor.subscribe("city");
   Meteor.subscribe("state");
   let States = StateApi.find().fetch();
   this.setState({states:States});
 });
}
 componentWillUnmount() {
 this.linktracker.stop();
 }

 handleStateSubmit(event) {
      event.preventDefault();
      const name = this.state.name.trim();
      const code = this.state.code.trim();
      const state={
        name:name,
        code:code,
      }
      Meteor.call('state.insert',state);
      this.setState({
      name:'',
      code:'',

   });
   }
   handleCitySubmit(event) {
     event.preventDefault();
     const cname = this.state.cname.trim();
     const stateid = this.state.stateid.trim();
     const city={
       name:cname,
       stateid:stateid,
     }
     console.log(city);
     Meteor.call('city.insert',city);
     this.setState({
     cname:'',
     stateid:'',
  });
  }
   render(){
    return(
      <div>
      <div>
      <form  onSubmit={this.handleStateSubmit.bind(this)}>

            <input type="text" placeholder="Enter State Name" value={this.state.name}  onChange={this.setValue.bind(this, 'name')} required/>


            <input type="text" placeholder="Enter State Code" value={this.state.code}  onChange={this.setValue.bind(this, 'code')} required/>


            <button type="submit">
              Submit
            </button>

       </form>
      </div>

      <div>
      <form  onSubmit={this.handleCitySubmit.bind(this)}>

            <select   value={this.state.stateid}  onChange={this.setValue.bind(this, 'stateid')} required>
            <option value="">select</option>
              {this.state.states.map((state, i) =>
              <option key={i} value={state._id}>{state.name}</option>
              )}
            </select>


            <input type="text" placeholder="Enter City" value={this.state.cname}  onChange={this.setValue.bind(this, 'cname')} required/>


            <button type="submit">
              Submit
            </button>

       </form>
      </div>

      </div>
    );
  }
}
