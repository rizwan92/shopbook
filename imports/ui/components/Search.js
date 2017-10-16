import React, { Component } from 'react';
import './Search.css';
export default class search  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div className="search-container">

       <div className="search-one">
         <div className="searchrow">
           <div className="searchgroup">
              <i className="material-icons" >search</i>
              <input type="search" placeholder="Search..." />
           </div>
             <i className="material-icons close-btn" >close</i>
         </div>
       </div>


       <div className="search-two">
          <select>
          <option value="" >State</option>
          <option>Chattisgarh</option>
          <option>Maharastra</option>
          <option>Banglore</option>
          </select>
          <select>
          <option value="" >Place</option>
          <option>Dhamtari</option>
          <option>Nagpur</option>
          <option>Marathalli</option>
          </select>
       </div>

       </div>
    );
  }
}
