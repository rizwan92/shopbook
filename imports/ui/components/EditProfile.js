import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './header/Header';
import { Session } from 'meteor/session';

export default class ShopShow extends Component {
  constructor(props) {
		super(props);
		this.state = {
      imageLink:'',
      name:Session.get('user').name,
      number:Session.get('user').number,
      sname:Session.get('user').sname,
      sadd:Session.get('user').sadd,
      scode:Session.get('user').scode,
		}

	}
  componentWillMount() {
    Meteor.subscribe("user");

}
  componentWillUnmount() {
  }
  uploadWidget(event) {
  event.preventDefault();
  let setImagelinkState = (link)=> {
    this.setState({imageLink:link});
    Meteor.call('user.update',Session.get('user')._id,link);
  }

       cloudinary.openUploadWidget({ cloud_name: 'dcr2pfgxy', upload_preset: 'kzkxno3w', tags:['xmas']},
           function(error, result) {
               setImagelinkState(result[0].secure_url);
           });
   }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 setValue(field, event) {
  let object = {};
  object[field] = event.target.value;
  this.setState(object);
}

      handleNameSubmit(e){
        e.preventDefault();
        const name = this.state.name;
        Meteor.call('user.updatedynamic',Session.get('user')._id,'name',name)
      }

      handleNumberSubmit(e){
        e.preventDefault();
      }

      handleShopNameSubmit(e){
        e.preventDefault();
      }

      handleShopAddressSubmit(e){
        e.preventDefault();
      }

      handleShopCodeSubmit(e){
        e.preventDefault();
      }

  render(){
   return (
     <div>
     <Header name="SocialShop" />
       <div className="mainlayout-container">
         <div className="mainlayoutone"></div>
         <div className="mainlayouttwo">

         <div className="adminlayout-crousel">
         <img src={Session.get('user').image ? Session.get('user').image : "http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"}  className="myimage" />
         </div>

         <div className="mainlayout-addproduct">
           <button className="mybutton" onClick={this.uploadWidget.bind(this)} >Change Image</button>
         </div>



         <div className="mainlayout-container">
           <div className="mainlayoutone"></div>
           <div className="mainlayouttwo">

           <div className="edit-container">

            <div className="edit-sub-container">
              <form className="formedit" onSubmit={this.handleNameSubmit.bind(this)}>
                <lable className="myeditlable">Name</lable>
                <input type="text"  className="form-control"  onChange={this.setValue.bind(this, 'name')} value={this.state.name}/>
                <button className="btn btn-info btn-sm myeditbutton">Update</button>
              </form>
            </div>

            <div className="edit-sub-container">
              <form className="formedit" onSubmit={this.handleNumberSubmit.bind(this)}>
                <lable className="myeditlable">Number</lable>
                <input type="text"  className="form-control"  onChange={this.setValue.bind(this, 'number')} value={this.state.number}/>
                <button className="btn btn-info btn-sm myeditbutton">Update</button>
              </form>
            </div>

            <div className="edit-sub-container">
              <form className="formedit" onSubmit={this.handleShopNameSubmit.bind(this)}>
                <lable className="myeditlable">Shop Name</lable>
                <input type="text"  className="form-control"  onChange={this.setValue.bind(this, 'sname')} value={this.state.sname}/>
                <button className="btn btn-info btn-sm myeditbutton">Update</button>
              </form>
            </div>

            <div className="edit-sub-container">
              <form className="formedit" onSubmit={this.handleShopAddressSubmit.bind(this)}>
                <lable className="myeditlable">Shop Address</lable>
                <input type="text"  className="form-control"  onChange={this.setValue.bind(this, 'sadd')} value={this.state.sadd}/>
                <button className="btn btn-info btn-sm myeditbutton">Update</button>
              </form>
            </div>

            <div className="edit-sub-container">
              <form className="formedit" onSubmit={this.handleShopCodeSubmit.bind(this)}>
                <lable className="myeditlable">Shop Code /GSTIN</lable>
                <input type="text"  className="form-control"  onChange={this.setValue.bind(this, 'scode')} value={this.state.scode}/>
                <button className="btn btn-info btn-sm myeditbutton">Update</button>
              </form>
            </div>

           </div>
           </div>
           <div className="mainlayoutthree"></div>
         </div>




         </div>
         <div className="mainlayoutthree"></div>
       </div>
     </div>
   )
 }
}
