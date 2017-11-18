import React, { Component } from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';
import Header from '../components/header/Header';
import SubCategoryPage from './SubCategoryPage';
import PropertyPage from './PropertyPage';
import Modal from '../components/Modal';
import AddCategory from '../components/category/AddCategory';
import CategoryList from '../components/category/CategoryList';
import { CategoryApi } from '../../api/category';
import { Session } from 'meteor/session';
class CategoryPage extends Component {
constructor(props) {
  super(props);
  this.state = {
    isModalOpen: false,
    category:[],
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
    Meteor.subscribe("category");
    let category = CategoryApi.find({}).fetch();
    this.setState({category});
  });
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
            <div className="categoryadddiv"><button className="btn btn-info btn-sm" onClick={this.openModal}>Add Category</button></div>
            <div className="categorysuper">
              <div className="categoryleft">
              {
                this.state.category.map((category,i)=>{
                return(
                  <NavLink to={`/category/${category._id}`} key={i}>
                  <CategoryList category={category} />
                  </NavLink>
                )
              })
              }
              </div>
              <div className="categoryright">
              <Route exact path="/category/:id" component={SubCategoryPage}/>
              <Route exact path="/category/subcategory/:id" component={PropertyPage}/>
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
            <AddCategory closeModal={this.closeModal.bind(this)}/>
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

export default withRouter(CategoryPage);
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
