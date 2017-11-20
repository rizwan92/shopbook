import React, { Component } from 'react';
import './ProductCard.css';
import { NavLink,withRouter } from 'react-router-dom';

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
          <div className="productcontainer">
            { this.props.isAdmin ?
              <div className="cancelbutton">
              <span className="glyphicon glyphicon-trash close-btn" onClick={this.productDelete.bind(this)}></span>
              </div>
              : null}
          <img src={this.props.product.image ? this.props.product.image : '/No_Image_Available.jpg'}
          alt="Avatar"  className="productimg"/>
          <div className="stepni">
            <h4><b>
            <NavLink  to={`/product/${this.props.product._id}`}>
              {this.props.product.name}
                </NavLink>
              </b></h4>
            <div className="productdetail">
            <p className="productprice">₹ {this.props.product.sellprice}</p>
            <p className="productdiscount">discount {this.props.product.discount} %</p>
            </div>
            <div className="productdetail">
            <p className="producttax">tax {this.props.product.tax ? this.props.product.tax : 0} %</p>
            <p className="productstock">stock {this.props.product.stock}</p>
            </div>
            </div>
          </div>
    );
  }
}
