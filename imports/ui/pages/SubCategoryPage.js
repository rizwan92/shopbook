import React, { Component } from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';
import { SubCategoryApi } from '../../api/subCategory';
import { Session } from 'meteor/session';
import Modal from '../components/Modal';
import AddSubCategory from '../components/category/AddSubCategory';
import SubCategoryList from '../components/category/SubCategoryList';
import { createContainer } from 'meteor/react-meteor-data';

class SubCategoryPage extends Component {
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


  render() {
    if (Session.get('selectedcategory') === this.props.match.params.id) {
        Session.set('selectedcategory',this.props.match.params.id)
    }else {
      Session.update('selectedcategory',this.props.match.params.id)
    }
    return (
      <div>
      <div className="categoryadddiv"><button className="btn btn-info btn-sm" onClick={this.openModal}>Add Sub Category</button></div>
      {
        this.props.subcategories.map((subcategory,i)=>{
        return(
          <NavLink to={`/category/subcategory/${subcategory._id}`} key={i}>
          <SubCategoryList subcategory={subcategory} />
          </NavLink>
        )
      })
      }

      <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}>
          <AddSubCategory closeModal={this.closeModal.bind(this)} catid={this.props.match.params.id} />
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
    const handle = Meteor.subscribe('subCategory');
    return {
        loading: !handle.ready(),
        subcategories: SubCategoryApi.find({catid:props.match.params.id}).fetch(),
    };
}, SubCategoryPage);

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
