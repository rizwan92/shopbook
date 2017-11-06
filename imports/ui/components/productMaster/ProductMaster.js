import React, { Component } from 'react';
import ProductMasterForm from './ProductMasterForm';
import ProductMasterDiplay from './ProductMasterDiplay';
import Modal from 'react-modal';
import {Tracker} from 'meteor/tracker';
import {ProductMasterApi} from '../../../api/productMaster'
import { Session } from 'meteor/session';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-30%',
    width                 :  '50%',
    transform             : 'translate(-50%, -50%)',
    border                : '1px solid black',
  }
};

 export default class ProductMaster  extends Component {
  constructor() {
    super();
    this.state = {
      products:[],
    modalIsOpen: false
  }
  this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
  }
  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("productMasterbyid",Session.get('shop')._id);
    let products = ProductMasterApi.find({shopid:Session.get('shop')._id}).fetch();
    this.setState({products});
    });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }

  openModal() {
   this.setState({modalIsOpen: true});
 }

 afterOpenModal() {
 }

 closeModal() {
   this.setState({modalIsOpen: false});
 }
  render(){
    return(
       <div>
       <div style={{display:'flex',flex:1,justifyContent:'flex-end'}} className="produclistbox">
       <button onClick={this.openModal}  className="btn btn-primary">+New</button>
       </div>
       <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         contentLabel="Example Modal"
       >
       <div style={{display:'flex',flex:1,justifyContent:'flex-end',margin:5}}>
       <button onClick={this.closeModal} className='btn btn-danger btn-sm' style={{borderRadius:50}}><span className="glyphicon glyphicon-remove"></span></button>
       </div>
         <ProductMasterForm  />
       </Modal>
       <ProductMasterDiplay products={this.state.products} />
       </div>
    );
  }
}
