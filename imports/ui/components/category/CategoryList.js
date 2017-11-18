import React, { Component } from 'react';
import { Session } from 'meteor/session';

class CategoryList extends Component {

  DeleteCategory(){
    let result = confirm("Want to delete?");
      if (result) {
        Meteor.call('category.remove',this.props.category._id);  //Logic to delete the item
        }
  }
  render() {
    return (
      <div className={ Session.get('selectedcategory') === this.props.category._id ? 'selectedcategory' :'categorylist-container' }>
      <div>{this.props.category.name}</div>
      <div><span className="glyphicon glyphicon-trash" onClick={this.DeleteCategory.bind(this)}></span></div>
      </div>
    );
  }

}

export default CategoryList;
