import React, { Component } from 'react';
import './ProductCard.css';
export default class ProductCard  extends Component {
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
          <div className="productcontainer">
            { this.props.isAdmin ?
              <div className="cancelbutton">
              <i className="material-icons close-btn" onClick={this.productDelete.bind(this)}>close</i>
              </div>
              : null}
          <img src={this.props.product.image ? this.props.product.image : 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'}
          alt="Avatar" width="100%" height="300px" className="productimg"/>
            <h4><b>{this.props.product.name}</b></h4>
            <div className="productdetail">
            <p className="productprice">₹ {this.props.product.sellprice}</p>
            <p className="productdiscount">Discount {this.props.product.discount} %</p>
            </div>
            <div className="productdetail">
            <p className="producttax">Tax {this.props.product.tax ? this.props.product.tax : 0} %</p>
            <p className="productstock">stock {this.props.product.stock}</p>
            </div>
          </div>
       </div>
    );
  }
}
