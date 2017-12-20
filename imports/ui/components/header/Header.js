import React, { Component } from 'react';
import './Header.css';
import { Session } from 'meteor/session';
import { withRouter,NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button';
import Modal from '../Modal';
import CreateShop from '../CreateShop';

 class Header extends Component {
  constructor(){
    super();
    this.state = {
			isModalOpen: false,
		}
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
  logoutHandle(){
     Session.clear();
     this.props.history.push('/');
    }
    loginHandle(){
        this.props.history.push('/login');
    }
    checkInShop(){
      this.props.history.push('/myshop');
    }
  home(){
      this.props.history.push('/');
  }
  nearby(){
    this.props.history.push('/nearby');
  }
  products(){
    this.props.history.push('/product');
  }
  billbook(){
    this.props.history.push('/billbook');
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
  render() {
    return (
      <div>
      <div className="header">

          <div className="headeritem one" onClick={this.home.bind(this)}>{this.props.name}</div>
          <div className="headeritem three">
          {
            Session.get('user') ?
          <div style={{display:'flex'}}>
            <div  className="mynavitmes" onClick={this.home.bind(this)}>Home</div>
            <div  className="mynavitmes" onClick={this.nearby.bind(this)}>Near By</div>
            <div  className="mynavitmes" onClick={this.products.bind(this)}>Shop</div>
            <div  className="mynavitmes" onClick={this.billbook.bind(this)}>Billbook</div>
            {
            Session.get('shop') ?
            this.props.isAdmin ?
              null
              :
              <div  className="mynavitmes" onClick={this.checkInShop.bind(this)}>MyShop</div>
              :
              <div  className="mynavitmes" onClick={this.openModal}>CreatShop</div>
            }
            <div  className="mynavitmes" onClick={this.logoutHandle.bind(this)}>Logout</div>
          </div>
          :
          <div style={{display:'flex'}}>
          <div  className="mynavitmes" onClick={this.home.bind(this)}>Home</div>
          <div  className="mynavitmes" onClick={this.nearby.bind(this)}>Near By</div>
          <div  className="mynavitmes" onClick={this.products.bind(this)}>Shop</div>
          <div  className="mynavitmes" onClick={this.loginHandle.bind(this)}>Signup</div>
          </div>
          }
          </div>
      </div>
      <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}>
          <CreateShop closeModal={this.closeModal.bind(this)}/>
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
export default withRouter(Header);
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
