import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './header/Header';
import ShopDetail from './ShopDetail';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import {Tracker} from 'meteor/tracker';
import {ProductMasterApi} from '../../api/productMaster';
import {VisitApi} from '../../api/visit';
import { Session } from 'meteor/session';
export default class ShopShow extends Component {
  constructor(props) {
		super(props);
		this.state = {
      shop:null,
      visit:null,
      products:[],
		}
	}
  componentWillMount() {
    if (Session.get(this.props.match.params.id)) {
        Meteor.call('visit.check',this.props.match.params.id,(error,result)=>{
            if (result) {
                this.setState({visit:result});
            }
        })
    }else {
      if (Session.get('shop')) {
        Meteor.call('visit.check',this.props.match.params.id,(error,result)=>{
            if (result) {
                this.setState({visit:result});
            }
        })
      }else {
        Meteor.call('visit.checkinsertupdate',this.props.match.params.id,(error,result)=>{
          if (result) {
            this.setState({visit:result});
            Session.setPersistent(this.props.match.params.id,this.props.match.params.id)
          }
        })
      }

    }

      Meteor.call('shop.get',this.props.match.params.id,(err,res)=>{
        if (res) {
          this.setState({shop:res});
        }
      })
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("productMaster");
    Meteor.subscribe("visit");
    let products = ProductMasterApi.find({shopid:this.props.match.params.id}).fetch();
    this.setState({products});
  });
}
  componentWillUnmount() {
  this.linktracker.stop();
  }

  render(){
   return (
     <div>
     <Header name="SocialShop" />
       <div className="mainlayout-container">
         <div className="mainlayoutone"></div>
         <div className="mainlayouttwo">

         <div className="adminlayout-crousel">
         <img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"  className="myimage" />
         </div>

          <div className="shop-details">
          {
            this.state.shop == null ? null :<ShopDetail shop={this.state.shop} visit={this.state.visit}/>
          }
          </div>

          <div className="card">
            {
              this.state.products.map((product,i)=>{
                return(
                  <NavLink key={i} to={`/product/${product._id}`}>
                  <ProductCard   product={product} isAdmin={false}/>
                  </NavLink>
                )
              })
            }
          </div>

         </div>
         <div className="mainlayoutthree"></div>
       </div>
     </div>
   )
 }
}
