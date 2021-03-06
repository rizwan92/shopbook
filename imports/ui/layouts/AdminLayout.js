import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';
import Header from '../components/header/Header';
import ShopDetail from '../components/ShopDetail';
import Modal from '../components/Modal';
import AddProduct from '../components/AddProduct';
import ProductCard from '../components/ProductCard';
import ProductCard1 from '../components/ProductCard1';
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
    handleEditProducts(){
      this.props.history.push('/edit/product');
    }
  render(){
   return (
     <div>
     <Header name="Shopbook" isAdmin={true}/>
       <div className="mainlayout-container">
         <div className="mainlayoutone"></div>
         <div className="mainlayouttwo">

         <div className="adminlayout-crousel">
         <img src={Session.get('shop').image ? Session.get('shop').image : '/No_Image_Available.jpg'}  className="myimage" />
         </div>

          <div className="mainlayout-addproduct1">
          <span className="glyphicon glyphicon-cog settingicon" onClick={this.handleEdit.bind(this)} data-toggle="tooltip" title="settings" ></span>
          <span className="glyphicon glyphicon-edit settingicon" onClick={this.handleEditProducts.bind(this)} data-toggle="tooltip" title="edit products" ></span>
         </div>
          <div className="shop-details">
          {
              this.state.visit == null ? null : <ShopDetail shop={Session.get('shop')} visit={this.state.visit}/>
          }
          </div>

          <div className="mainlayout-addproduct">
            <button style={mainStyle.button} onClick={this.openModal} >Add Product</button>
          {Session.get('shop').smessenger ? <a href={Session.get('shop').smessenger ? `https://m.me/${Session.get('shop').smessenger}` : "#"} style={mainStyle.mbutton}>Messenger</a> :null}
          {Session.get('shop').swhatsapp ? <a href={Session.get('shop').swhatsapp ? Session.get('shop').swhatsapp : "#"} style={mainStyle.wbutton} >Whatsapp</a> :null}
          </div>


          <div className="main-carousel" data-flickity='{ "cellAlign": "center", "contain": true }'>
            {
              this.state.products.map((product,i)=>{
                return(
                  <div className="carousel-cell" key={i}>
                  dvdv
                  </div>
                )
              })
            }
          </div>



          <div className="card">
            {
              this.state.products.map((product,i)=>{
                return(
                  <ProductCard   product={product} isAdmin={true} key={i}/>
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
		backgroundColor: '#009688',
		border: 0,
		padding: '10px 15px',
		color: '#fff',
		display: 'block',
		borderRadius: 3,
    margin:5,
    boxShadow: '8px 12px 30px #b3b3b3',
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
    boxShadow: '8px 12px 30px #b3b3b3',
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
    boxShadow: '8px 12px 30px #b3b3b3',
	},
};

export default withRouter(AdminLayout);
