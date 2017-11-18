import React, { Component } from 'react';
import { Session } from 'meteor/session';

class ProductList extends Component {

  DeleteCategory(){
    let result = confirm("Want to delete?");
      if (result) {
        Meteor.call('product.remove',this.props.product._id);  //Logic to delete the item
        }
  }
  render() {
    return (
      <div className={ Session.get('selectedproduct') === this.props.product._id ? 'selectedproduct' :'categorylist-container' }>
      <div>{this.props.product.name}</div>
      <div><span className="glyphicon glyphicon-trash" onClick={this.DeleteCategory.bind(this)}></span></div>
      </div>
    );
  }

}

export default ProductList;
