import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { PropertyApi } from '../../api/property';
import { Session } from 'meteor/session';
import Modal from '../components/Modal';
import AddProperty from '../components/category/AddProperty';
import PropertyList from '../components/category/PropertyList';
import { createContainer } from 'meteor/react-meteor-data';

class PropertyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      subcategories:[]
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

  handleBack(){
    this.props.history.goBack()
  }
  render() {
    if (Session.get('selectedsubcategory') === this.props.match.params.id) {
        Session.set('selectedsubcategory',this.props.match.params.id)
    }else {
      Session.update('selectedsubcategory',this.props.match.params.id)
    }

    return (
      <div>
      <div className="categoryadddiv"><button className="btn btn-info btn-sm" onClick={this.openModal}>Add Property</button></div>
      <div className="subcategoryadddiv"><button className="btn btn-primary btn-sm" onClick={this.handleBack.bind(this)}><span className="glyphicon glyphicon-arrow-left"></span></button></div>

      {
        this.props.properties.map((property,i)=>{
        return(
          <PropertyList property={property} key={i} />
        )
      })
      }
      <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}>
          <AddProperty closeModal={this.closeModal.bind(this)} subcatid={this.props.match.params.id} />
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

export default createContainer((props) => {
    const handle = Meteor.subscribe('property');
    return {
        loading: !handle.ready(),
        properties: PropertyApi.find({subcatid:props.match.params.id}).fetch(),
    };
}, withRouter(PropertyPage));
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
