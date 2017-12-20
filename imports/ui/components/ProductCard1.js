import React, { Component } from 'react';
import './ProductCard.css';
import { NavLink,withRouter } from 'react-router-dom';

export default class ProductCard1  extends Component {
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
        <li className="product">
          <a className="img-wrapper" href="#">
            <img src="https://hussein-alhammad.com/images/codepen/product-card/running-shoe_blue.jpg" alt="Blue running shoe" />
          </a>

          <div className="info">
            <div className="title">Some Product</div>
            <div className="price">$34.99</div>
          </div>

          <div className="actions-wrapper">
            <a href="#" className="add-btn wishlist">Wishlist</a>
            <a href="#" className="add-btn cart">Cart</a>
          </div>
        </li>
        );
  }
}
