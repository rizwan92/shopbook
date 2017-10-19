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
    if (this.state.shop) {
      console.log(this.state.shop);
    }
   return (
     <div>
     <Header name="Shopbook" />
       <div className="mainlayout-container">
         <div className="mainlayoutone"></div>
         <div className="mainlayouttwo">

         <div className="adminlayout-crousel">
          {
            this.state.shop == null ? null : <img src={this.state.shop.image ? this.state.shop.image : "http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"}  className="myimage" />
          }

         </div>

          <div className="shop-details">
          {
            this.state.shop == null ? null :<ShopDetail shop={this.state.shop} visit={this.state.visit}/>
          }
          </div>

            {
              this.state.shop == null ? null
              :
              <div className="mainlayout-addproduct">
              { this.state.shop.smessenger ? <a href={this.state.shop.smessenger ? `https://m.me/${this.state.shop.smessenger}` : "#"} style={mainStyle.mbutton}>Messenger</a> :null}
              {this.state.shop.swhatsapp ? <a href={this.state.shop.swhatsapp ? this.state.shop.swhatsapp : "#"} style={mainStyle.wbutton} >Whatsapp</a> :null}
              </div>
            }

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
const mainStyle = {
	button: {
    fontWeight:600,
		backgroundColor: '#009688',
		border: 0,
		padding: '10px 15px',
		color: '#fff',
		display: 'block',
		borderRadius: 3,
    margin:5,
	},
  mbutton: {
    fontWeight:600,
		backgroundColor: '#408cec',
		border: 0,
		padding: '10px 15px',
		color: '#fff',
		display: 'block',
		borderRadius: 3,
    margin:5,
	},
  wbutton: {
    fontWeight:600,
		backgroundColor: 'green',
		border: 0,
		padding: '10px 15px',
		color: '#fff',
		display: 'block',
		borderRadius: 3,
    margin:5,
	},
};
