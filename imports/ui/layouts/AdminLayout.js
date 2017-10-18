import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';
import Header from '../components/header/Header';
import ShopDetail from '../components/ShopDetail';
import Modal from '../components/Modal';
import AddProduct from '../components/AddProduct';
import ProductCard from '../components/ProductCard';
import {Tracker} from 'meteor/tracker';
import {ProductMasterApi} from '../../api/productMaster';

class AdminLayout extends Component {
  constructor(props) {
		super(props);
		this.state = {
      products:[],
			isModalOpen: false,
			isInnerModalOpen: false,
      visit:null,
		}
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);

	}
  closeModal() {
    this.setState({
      isModalOpen: false
    })
  }
  componentWillMount() {
    if (Session.get(Session.get('shop')._id)) {
        Meteor.call('visit.check',Session.get('shop')._id,(error,result)=>{
            if (result) {
                this.setState({visit:result});
            }
        })
    }else {
      if (Session.get('shop')._id == Session.get(Session.get('shop')._id)) {
        Meteor.call('visit.check',this.props.match.params.id,(error,result)=>{
            if (result) {
                this.setState({visit:result});
            }
        })
      }else {
        Meteor.call('visit.checkinsertupdate',Session.get('shop')._id,(error,result)=>{
          if (result) {
            this.setState({visit:result});
            Session.setPersistent(Session.get('shop')._id,Session.get('shop')._id)
          }
        })
      }

    }
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("productMaster");
    let products = ProductMasterApi.find({shopid:Session.get('shop')._id}).fetch();
    this.setState({products});
  });
}
  componentWillUnmount() {
  this.linktracker.stop();
  }
  openModal() {
    this.setState({
      isModalOpen: true
    })
  }
    handleEdit(){
      this.props.history.push('/edit');
    }

  render(){
   return (
     <div>
     <Header name="SocialShop" isAdmin={true}/>
       <div className="mainlayout-container">
         <div className="mainlayoutone"></div>
         <div className="mainlayouttwo">

         <div className="adminlayout-crousel">
         <img src={Session.get('shop').image ? Session.get('user').image : "http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"}  className="myimage" />
         </div>

          <div className="mainlayout-addproduct">
          <i className="material-icons settingicon" onClick={this.handleEdit.bind(this)} >settings</i>
         </div>
          <div className="shop-details">
          {
              this.state.visit == null ? null : <ShopDetail shop={Session.get('shop')} visit={this.state.visit}/>
          }
          </div>

          <div className="mainlayout-addproduct">
            <button style={mainStyle.button} onClick={this.openModal} >Add Product</button>
          </div>

          <div className="card">
            {
              this.state.products.map((product,i)=>{
                return(
                  <NavLink key={i} to={`/product/${product._id}`}>
                  <ProductCard   product={product} isAdmin={true}/>
                  </NavLink>
                )
              })
            }
          </div>

         </div>
         <div className="mainlayoutthree"></div>
       </div>
       <Modal
           isModalOpen={this.state.isModalOpen}
           closeModal={this.closeModal}
           style={modalStyle}>
           <AddProduct closeModal={this.closeModal}/>
           <button style={{
            ...mainStyle.button,
            margin: 0,
            width: 'auto',
            marginTop: 10
          }} onClick={this.closeModal}>Close</button>
       </Modal>
     </div>
   )
 }
}

const modalStyle = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0,0.5)'
	}
};

const mainStyle = {
	button: {
    fontWeight:600,
		backgroundColor: '#408cec',
		border: 0,
		padding: '10px 15px',
		color: '#fff',
		width: 150,
		display: 'block',
		borderRadius: 3
	}
};

export default withRouter(AdminLayout);
