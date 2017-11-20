import React, { Component } from 'react';
import './ProductDetail.css'
import Header from './header/Header';
export default class ProductDetail  extends Component {
  constructor() {
    super();
    this.state={
      product:'',
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
    let keyarray = Object.keys(this.state.product);
    return(
      <div>
      <Header name="SocialShop" />
      { this.state.product === '' ? 'wait':
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">


          <div className="singleproduct-crousel">
          <div className="mainlayout-container">
            <div className="mainlayoutone"></div>
            <div className="mainlayouttwo">
            <img src={this.state.product.image ? this.state.product.image : '/No_Image_Available.jpg'}
            alt="Avatar" width="100%"  className="singleproductimg"/>
            </div>
            <div className="mainlayoutthree"></div>
          </div>
          </div>

          <div className="singleproduct-container">
             <div className="singleproduct-container-name"> { this.state.product.name }</div>
             <div className="singleproduct-container-sellprice"> Price - ₹ { this.state.product.sellprice }</div>
             <div className="singleproduct-container-discount"> Discount - { this.state.product.discount } %</div>
             <div className="singleproduct-container-tax"> Tax - { this.state.product.tax } %</div>
             <div className="singleproduct-container-stock">In Stock - { this.state.product.stock }</div>
             {
               keyarray.map((keys,i)=>{
                  type = typeof this.state.product[keys];
                  if (type === "string" && keys !== "_id" && keys !== "userid" && keys !== "shopid" && keys !== "name" && keys !== "costprice" && keys !== "sellprice"
                   && keys !== "tax" && keys !== "discount" && keys !== "image" && keys !== "stock" && keys !== "catid" && keys !== "subcatid")  {
                    return(
                      <div className="singleproduct-container-discount" key={i}>{keys + '-  '+this.state.product[keys]}</div>
                    )
                  }
               })
             }

          </div>

          </div>
          <div className="mainlayoutthree"></div>
        </div>
      }
      </div>

    );
  }
}
