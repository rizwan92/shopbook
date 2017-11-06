import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';
import ContentEditable from 'react-contenteditable';

 export default class ProductMasterDiplaySingleItem extends Component {
  constructor(props) {
    super();
    this.state = {
    };
  }
  deleteProduct(){
    let result = confirm("Want to delete?");
      if (result) {
        Meteor.call('product.remove',this.props.product._id);  //Logic to delete the item
        }
  }
  render(){
    return(
         <div className="product-list-div" >
           <div className="product-list-subdiv1" >
               <div className="product-list-subdiv-1">Name :- {this.props.product.name}</div>
               <div className="product-list-subdiv-1">Sell Price :- {this.props.product.sellprice}</div>
               <div className="product-list-subdiv-1">HSN Code :- {this.props.product.hsncode}</div>
           </div>
           <div className="product-list-subdiv2" >
               <div className="product-list-subdiv-1">Tax :- {this.props.product.tax}</div>
               <div className="product-list-subdiv-1">Cost Price :- {this.props.product.costprice}</div>
               <div className="product-list-subdiv-1">Unit :- {this.props.product.unit}</div>
               <div className="product-list-subdiv-1">Stock :- {this.props.product.stock}</div>
           </div>
             <div  onClick={ ()=> this.deleteProduct() } style={{position:'relative',top:0,right:2,paddingLeft:20,paddingRight:20,cursor:'pointer',color:'red'}}><span className="glyphicon glyphicon-trash"></span></div>
         </div>
       );
}
}
