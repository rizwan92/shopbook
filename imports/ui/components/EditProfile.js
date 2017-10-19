import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './header/Header';
import { Session } from 'meteor/session';
import {ShopApi} from '../../api/shop';
import {UserApi} from '../../api/user';

export default class ShopShow extends Component {
  constructor(props) {
		super(props);
		this.state = {
      imageLink:'',
      name:"",
      number:"",
      sname:"",
      sadd:"",
      scode:"",
      simage:'',
      swhatsapp:'',
      smessenger:'',
      shop:null,
      user:null,
		}

	}
  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("myshop",Session.get('shop')._id);
      Meteor.subscribe("user",Session.get('user')._id);
      let shops = ShopApi.find().fetch();
      let user = UserApi.find().fetch();
      if (shops[0]) {
        this.setState({shop:shops[0],  sname:shops[0].sname,sadd:shops[0].sadd,scode:shops[0].scode,simage:shops[0].image,swhatsapp:shops[0].swhatsapp,smessenger:shops[0].smessenger});
      }
      if (user[0]) {
        this.setState({user:user[0],  name:user[0].name,number:user[0].number,});
      }

    });
}
  componentWillUnmount() {
    this.linktracker.stop();
  }
  uploadWidget(event) {
  event.preventDefault();
  let setImagelinkState = (link)=> {
    Meteor.call('shop.updatedynamic',Session.get('shop')._id,'image',link,(err,res)=>{
      if (res == 1) {
        let myshop = Session.get('shop');
        myshop.image = link ;
        Session.update('shop',myshop);
        Bert.alert( 'image uploaded', 'success', 'growl-top-right' );
      }
    })
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
        if (this.state.name === '') {
          Bert.alert( 'field is empty', 'danger', 'growl-top-right' );
        }else {
          Meteor.call('user.updatedynamic',Session.get('user')._id,'name',name,(err,res)=>{
            if (res == 1) {
              Bert.alert( 'Name Updated', 'success', 'growl-top-right' );
            }
          })
        }
      }

      handleNumberSubmit(e){
        e.preventDefault();
        const number = this.state.number;
        if (this.state.number === '') {
          Bert.alert( 'field is empty', 'danger', 'growl-top-right' );
        }else {
          Meteor.call('user.updatedynamic',Session.get('user')._id,'number',number,(err,res)=>{
            if (res == 1) {
              Bert.alert( 'Number Updated', 'success', 'growl-top-right' );
            }
          })
        }
      }

      handleShopNameSubmit(e){
        e.preventDefault();
        const sname = this.state.sname;
        if (this.state.sname === '') {
          Bert.alert( 'field is empty', 'danger', 'growl-top-right' );
        }else {
          Meteor.call('shop.updatedynamic',Session.get('shop')._id,'sname',sname,(err,res)=>{
            if (res == 1) {
              Bert.alert( 'Shop Name Updated', 'success', 'growl-top-right' );
            }
          })
        }
      }

      handleShopAddressSubmit(e){
        e.preventDefault();
        const sadd = this.state.sadd;
        if (this.state.sadd === '') {
          Bert.alert( 'field is empty', 'danger', 'growl-top-right' );
        }else {
          Meteor.call('shop.updatedynamic',Session.get('shop')._id,'sadd',sadd,(err,res)=>{
            if (res == 1) {
              Bert.alert( 'Shop Address Updated', 'success', 'growl-top-right' );
            }
          })
        }

      }

      handleShopCodeSubmit(e){
        e.preventDefault();
        const scode = this.state.scode;
        if (this.state.sname === '') {
          Bert.alert( 'field is empty', 'danger', 'growl-top-right' );
        }else {
          Meteor.call('shop.updatedynamic',Session.get('shop')._id,'scode',scode,(err,res)=>{
            if (res == 1) {
              Bert.alert( 'Shop Code Updated', 'success', 'growl-top-right' );
            }
          })
        }
      }
      handleShopMessengerSubmit(e){
        e.preventDefault();
        const smessenger = this.state.smessenger;
        if (this.state.smessenger === '') {
          Bert.alert( 'field is empty', 'danger', 'growl-top-right' );
        }else {
          Meteor.call('shop.updatedynamic',Session.get('shop')._id,'smessenger',smessenger,(err,res)=>{
            if (res == 1) {
              let myshop = Session.get('shop');
              myshop.smessenger = smessenger ;
              Session.update('shop',myshop);
              Bert.alert( 'Messenger Link Updated', 'success', 'growl-top-right' );
            }
          })
        }
      }
      handleShopWhatsappSubmit(e){
        e.preventDefault();
        const swhatsapp = this.state.swhatsapp;
        if (this.state.swhatsapp === '') {
          Bert.alert( 'field is empty', 'danger', 'growl-top-right' );
        }else {
          Meteor.call('shop.updatedynamic',Session.get('shop')._id,'swhatsapp',swhatsapp,(err,res)=>{
            if (res == 1) {
              let myshop = Session.get('shop');
              myshop.swhatsapp = swhatsapp ;
              Session.update('shop',myshop);
              Bert.alert( 'Whatsapp Link Updated', 'success', 'growl-top-right' );
            }
          })
        }

      }

  render(){
   return (
     <div>
     <Header name="Shopbook" />
       <div className="mainlayout-container">
         <div className="mainlayoutone"></div>
         <div className="mainlayouttwo">

         <div className="adminlayout-crousel">
         <img src={this.state.simage != '' ? this.state.simage  : "http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"}  className="myimage" />
         </div>

         <div className="mainlayout-addproduct">
           <button className="mybutton" onClick={this.uploadWidget.bind(this)} >Change Image</button>
         </div>



         <div className="mainlayout-container">
           <div className="mainlayoutone"></div>
           <div className="mainlayouttwo">

           <div className="edit-container">

              <form className="formedit" onSubmit={this.handleNameSubmit.bind(this)} className="edit-sub-container">
                <div className="wrap-label"><label className="editlabel">Your Name</label><p className="iconicfill-pen-alt2"></p></div>
                <div className="inputandbutton">
                  <input type="text" id="name" className="editinput" value={this.state.name} onChange={this.setValue.bind(this,'name')}/>
                  <button type="submit" className="myeditbutton">Update</button>
                </div>
              </form>

              <form className="formedit" onSubmit={this.handleNumberSubmit.bind(this)} className="edit-sub-container">
                <div className="wrap-label"><label className="editlabel">Your Number</label><p className="iconicfill-pen-alt2"></p></div>
                <div className="inputandbutton">
                  <input type="text" id="name" className="editinput" value={this.state.number} onChange={this.setValue.bind(this,'number')}/>
                  <button type="submit" className="myeditbutton">Update</button>
                </div>
              </form>

              <form className="formedit" onSubmit={this.handleShopNameSubmit.bind(this)} className="edit-sub-container">
                <div className="wrap-label"><label className="editlabel">Shop Name</label><p className="iconicfill-pen-alt2"></p></div>
                <div className="inputandbutton">
                  <input type="text" id="name" className="editinput" value={this.state.sname} onChange={this.setValue.bind(this,'sname')}/>
                  <button type="submit" className="myeditbutton">Update</button>
                </div>
              </form>

              <form className="formedit" onSubmit={this.handleShopAddressSubmit.bind(this)} className="edit-sub-container">
                <div className="wrap-label"><label className="editlabel">Shop Address</label><p className="iconicfill-pen-alt2"></p></div>
                <div className="inputandbutton">
                  <input type="text" id="name" className="editinput" value={this.state.sadd} onChange={this.setValue.bind(this,'sadd')}/>
                  <button type="submit" className="myeditbutton">Update</button>
                </div>
              </form>

              <form className="formedit" onSubmit={this.handleShopCodeSubmit.bind(this)} className="edit-sub-container">
                <div className="wrap-label"><label className="editlabel">Shop Code/GSTIN</label><p className="iconicfill-pen-alt2"></p></div>
                <div className="inputandbutton">
                  <input type="text" id="name" className="editinput" value={this.state.scode} onChange={this.setValue.bind(this,'scode')}/>
                  <button type="submit" className="myeditbutton">Update</button>
                </div>
              </form>

              <form className="formedit" onSubmit={this.handleShopWhatsappSubmit.bind(this)} className="edit-sub-container">
                <div className="wrap-label"><label className="editlabel">Enter Your Whatsapp Group Link</label><p className="iconicfill-pen-alt2"></p></div>
                <div className="inputandbutton">
                  <input type="text" id="name" className="editinput" value={this.state.swhatsapp} onChange={this.setValue.bind(this,'swhatsapp')}/>
                  <button type="submit" className="myeditbutton">Submit</button>
                </div>
              </form>

              <form className="formedit" onSubmit={this.handleShopMessengerSubmit.bind(this)} className="edit-sub-container">
                <div className="wrap-label"><label className="editlabel">Enter Your Messenger Link</label><p className="iconicfill-pen-alt2"></p></div>
                <div className="inputandbutton">
                  <input type="text" id="name" className="editinput" value={this.state.smessenger} onChange={this.setValue.bind(this,'smessenger')}/>
                  <button type="submit" className="myeditbutton">Submit</button>
                </div>
              </form>




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
