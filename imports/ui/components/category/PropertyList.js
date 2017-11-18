import React, { Component } from 'react';

class PropertyList extends Component {

  DeleteProperty(){
    let result = confirm("Want to delete?");
      if (result) {
        Meteor.call('property.remove',this.props.property._id);  //Logic to delete the item
        }
  }
  render() {
    return (
      <div className="categorylist-container">
      <div>{this.props.property.name}</div>
      <div><span className="glyphicon glyphicon-trash" onClick={this.DeleteProperty.bind(this)}></span></div>
      </div>
    );
  }

}

export default PropertyList;
