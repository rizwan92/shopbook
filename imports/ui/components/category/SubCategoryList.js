import React, { Component } from 'react';
import { Session } from 'meteor/session';

class SubCategoryList extends Component {

  DeleteSubCategory(){
    let result = confirm("Want to delete?");
      if (result) {
        Meteor.call('subcategory.remove',this.props.subcategory._id);  //Logic to delete the item
        }
  }

  render() {
    return (
      <div className={ Session.get('selectedsubcategory') === this.props.subcategory._id ? 'selectedcategory' :'categorylist-container' }>
        <div>{this.props.subcategory.name}</div>
        <div><span className="glyphicon glyphicon-trash" onClick={this.DeleteSubCategory.bind(this)}></span></div>
      </div>
    );
  }

}

export default SubCategoryList;
