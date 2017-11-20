import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ShopCard.css';
export default class ShopCard  extends Component {
  constructor() {
    super();
  }
  productDelete(){
      let result = confirm("Want to delete?");
    if (result) {
      Meteor.call('product.remove',this.props.product._id);
      }
  }
  render(){
    return(
       <div>
          <div className="shopcontainer">
          <img src={this.props.product.image ? this.props.product.image : '/No_Image_Available.jpg'}
          alt="Avatar" width="100%" height="300px" className="shopimg"/>
          <div className="shopstepni">
              <div className="shoppname">
              <NavLink  to={`/shop/${this.props.product._id}`}>
              {this.props.product.sname}
              </NavLink>
              </div>
            <div className="shopdetail">
            <p className="shopprice">Email - {this.props.product.userdetail.email}</p>
            <p className="shopdiscount">Contact - {this.props.product.userdetail.number}</p>
            <p className="shopstock">GSTIN - {this.props.product.scode}</p>
            <p className="shoptax">Address - {this.props.product.sadd}</p>
            {
              this.props.isNearBy ? <p className="shoptax">distance - {this.props.product.distance} Km</p> : null
            }
            </div>
            </div>
          </div>
       </div>
    );
  }
}
