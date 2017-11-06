import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import ProductMasterDiplaySingleItem from './ProductMasterDiplaySingleItem';
 export default class ProductMasterDiplay extends Component {
  constructor() {
    super();
  }

  render(){
    return(
       <div>
       {this.props.products.map((product, i)=>
                <NavLink key={i} to={`/product/edit/${product._id}`}>
                <ProductMasterDiplaySingleItem product={product} />
                </NavLink>
       )}
       </div>
    );
  }
}
