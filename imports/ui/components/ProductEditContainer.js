import React, { Component } from 'react';
import {ProductMasterApi} from '../../api/productMaster';
import { createContainer } from 'meteor/react-meteor-data';
import { SubCategoryApi } from '../../api/subCategory';
import { CategoryApi } from '../../api/category';
import ProductEdit from './ProductEdit';
class ProductEditContainer  extends Component {

  render(){
    return(
      <div>
      {
        this.props.product == null ? null :<ProductEdit product={this.props.product} categories={this.props.categories} subcategories={this.props.subcategories}/>
      }
      </div>
    );
  }
}
export default createContainer((props) => {
    const handle = Meteor.subscribe('subCategory');
    const handle1 = Meteor.subscribe('category');
    const handle2 = Meteor.subscribe("productMasterbyindividual",props.match.params.id);
    return {
        loading: !handle2.ready(),
        subcategories: SubCategoryApi.find({}).fetch(),
        categories: CategoryApi.find({}).fetch(),
        product : handle2.ready() ? ProductMasterApi.find({_id:props.match.params.id}).fetch() : null,
    };
}, ProductEditContainer);
