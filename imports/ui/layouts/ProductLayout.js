import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/header/Header';
import {ProductMasterApi} from '../../api/productMaster';
import ProductCard from '../components/ProductCard';

export default class ProductLayout  extends Component {
  constructor() {
    super();
    this.state = {
      products:[],
      changeicon:true,
      search:'',
    }
  }
  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("productMaster");
    let products = ProductMasterApi.find({}).fetch();
    this.setState({products});
  });
  }

  handleSearch(event){
    this.setState({search:event.target.value});
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  changeIcon(){
    this.setState({changeicon:!this.state.changeicon})
  }
  changeIconforcross(){
    this.setState({search:'',changeicon:!this.state.changeicon})
  }

  render(){
    let searchproducts = this.state.products.filter((product)=>{
      return(product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1)
    })

    return(
      <div>
      <Header name="Shopbook" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">

          <div className="mainlayout-search">
            <div className="search-container">
              <div className="search-one">
                <div className="searchrow">
                  <div className="searchgroup">
                      <input type="search" placeholder="Search Your Products By Name..." id="pac-input3" value={this.state.search} onChange={this.handleSearch.bind(this)}  onFocus={this.changeIcon.bind(this)}/>
                  </div>
                  {
                    this.state.changeicon ? <span className="glyphicon glyphicon-search close-btn-search" ></span> :<span className="glyphicon glyphicon-remove close-btn-search" onClick={this.changeIconforcross.bind(this)}></span>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            {
              searchproducts.map((product,i)=>{
                return(
                  <ProductCard   product={product} isAdmin={false} key={i}/>
                )
              })
            }
          </div>

          </div>
          <div className="mainlayoutthree"></div>
        </div>
      </div>
    );
  }
}
