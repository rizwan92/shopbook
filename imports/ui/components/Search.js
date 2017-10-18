import React, { Component } from 'react';
import './Search.css';
export default class search  extends Component {
  constructor() {
    super();
    this.state={
      long:'',
      addr:'',
      changeicon:true,
    }
  }
handleDistance(event){
  this.props.changeDistance(event.target.value);
}
changeIcon(){
  this.setState({changeicon:!this.state.changeicon})
}
  render(){
    return(
       <div className="search-container">

       <div className="search-one">
         <div className="searchrow">
           <div className="searchgroup">
              <input type="search" placeholder="Search..." id="pac-input3" onBlur={this.changeIcon.bind(this)} onFocus={this.changeIcon.bind(this)}/>
           </div>
           {
             this.state.changeicon ? <i className="material-icons" onClick={this.changeIcon.bind(this)} >search</i> :<i className="material-icons close-btn" onClick={this.changeIcon.bind(this)}>close</i>
           }
         </div>
       </div>


       <div className="search-two" value={this.state.distance} onChange={this.handleDistance.bind(this)}>
          <select>
          <option value="1">1 km </option>
          <option value="2">2 km </option>
          <option value="3">3 km </option>
          <option value="4">4 km </option>
          <option value="5" selected>5 km </option>
          <option value="6">6 km </option>
          <option value="7">7 km </option>
          <option value="8">8 km </option>
          <option value="9">9 km </option>
          <option value="10">10 km </option>
          </select>
       </div>

       </div>
    );
  }
}
