import React, { Component } from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';
import Header from '../components/header/Header';
import Modal from '../components/Modal';
import ProductList from '../components/productMaster/ProductList';
import { ProductMasterApi } from '../../api/productMaster';
import ProductEditContainer from '../components/ProductEditContainer';
import { Session } from 'meteor/session';
class EditProductPage extends Component {
constructor(props) {
  super(props);
  this.state = {
    isModalOpen: false,
    products:[],
  };
  this.closeModal = this.closeModal.bind(this);
  this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({
      isModalOpen: true
    })
  }
  closeModal() {
    this.setState({
      isModalOpen: false
    })
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

  handleClick(id){
  }
  render() {
    return (
      <div>
      <Header name="Shopbook" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">

            <div className="category-container">
            <div className="categoryadddiv"><button className="btn btn-info btn-sm" onClick={this.openModal}>Add Product</button></div>
            <div className="categorysuper">
              <div className="categoryleft">
              {
                this.state.products.map((product,i)=>{
                return(
                  <NavLink to={`/edit/product/${product._id}`} key={i}>
                  <ProductList product={product} />
                  </NavLink>
                )
              })
              }
              </div>
              <div className="categoryright">
              <Route exact path="/edit/product/:id" component={ProductEditContainer}/>
              </div>
            </div>
            </div>

          </div>
          <div className="mainlayoutthree"></div>
        </div>
        <Modal
            isModalOpen={this.state.isModalOpen}
            closeModal={this.closeModal}
            style={modalStyle}>
            <button style={{
             ...mainStyle.button,
             margin: 0,
             width: 'auto',
             marginTop: 10
           }} onClick={this.closeModal}>Close</button>
        </Modal>

      </div>
    );
  }

}

export default withRouter(EditProductPage);
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
