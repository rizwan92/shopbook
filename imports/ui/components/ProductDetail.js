import React, { Component } from 'react';
import './ProductDetail.css'
import Header from './header/Header';
export default class ProductDetail  extends Component {
  constructor() {
    super();
    this.state={
      product:{},
    }
  }
  componentWillMount(){
    Meteor.call('product.singleitem',this.props.match.params.id,(err,res)=>{
      if (res) {
          this.setState({product:res})
      }
    })
  }
  render(){
    return(
      <div>
      <Header name="SocialShop" />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">


          <div className="singleproduct-crousel">
          <div className="mainlayout-container">
            <div className="mainlayoutone"></div>
            <div className="mainlayouttwo">
            <img src={this.state.product.image ? this.state.product.image : 'http://www.pbs.org/weta/africas-great-civilizations/lunchbox_plugins/s/photogallery/img/no-image-available.jpg'}
            alt="Avatar" width="100%"  className="singleproductimg"/>
            </div>
            <div className="mainlayoutthree"></div>
          </div>
          </div>

          <div className="singleproduct-container">
             <div className="singleproduct-container-name"> Product Name - { this.state.product.name }</div>
             <div className="singleproduct-container-sellprice">Product Price - ₹ { this.state.product.sellprice }</div>
             <div className="singleproduct-container-discount">Product Discount - { this.state.product.discount } %</div>
             <div className="singleproduct-container-tax">Product Tax - { this.state.product.tax } %</div>
             <div className="singleproduct-container-stock">In Stock - { this.state.product.stock }</div>
          </div>

          </div>
          <div className="mainlayoutthree"></div>
        </div>
      </div>

    );
  }
}
