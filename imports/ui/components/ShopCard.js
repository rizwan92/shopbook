import React, { Component } from 'react';
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
            { this.props.isAdmin ?
              <div className="cancelbutton">
              <i className="material-icons close-btn" onClick={this.productDelete.bind(this)}>close</i>
              </div>
              : null}
          <img src={this.props.product.image ? this.props.product.image : 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'}
          alt="Avatar" width="100%" height="300px" className="productimg"/>
              <div className="shoppname">{this.props.product.sname}</div>
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
    );
  }
}
