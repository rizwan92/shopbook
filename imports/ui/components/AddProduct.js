import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { SubCategoryApi } from '../../api/subCategory';
import { CategoryApi } from '../../api/category';

class AddProduct  extends Component {
  constructor() {
    super();
    this.state={
      name:'',
      cprice:'',
      sprice:'',
      tax:'',
      discount:'',
      stock:'',
      imageLink:'',
      catid:'',
      subcatid:'',
          }
  }
  handleRSubmit(event) {
    event.preventDefault();
    const name = this.state.name.trim();
    const cprice = this.state.cprice.trim();
    const sprice = this.state.sprice.trim();
    const tax = this.state.tax.trim();
    const discount = this.state.discount.trim();
    const stock = this.state.stock.trim();
    const imageLink = this.state.imageLink.trim();
    const catid = this.state.catid.trim();
    const subcatid = this.state.subcatid.trim();
    const hsncode = '';
    const unit = '';

      if (Session.get('shop')) {
        let product ={
          shopid:Session.get('shop')._id,userid:Session.get('user')._id,shopdetail:Session.get('shop'),name,cprice,sprice,tax,discount,stock,imageLink,catid,subcatid,hsncode,unit
        }
        Meteor.call('product.insert',product,(err,res)=>{
          if (!err) {
            Bert.alert( 'Product Added', 'success', 'growl-top-right' );
            this.setState({
              name:'',
              cprice:'',
              sprice:'',
              tax:'',
              discount:'',
              stock:'',
              subcatid:'',
            })
            this.props.closeModal();
          }
        })
      }else {
        Bert.alert( 'you are not logged in', 'danger', 'growl-top-right' );
      }

  }
  uploadWidget(event) {
  event.preventDefault();
  let setImagelinkState = (link)=> {
    this.setState({imageLink:link});
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
  render(){
    return(
       <div>
         <div className="addproduct-container">
           <h2>Add Product</h2>
           <form onSubmit={this.handleRSubmit.bind(this)}>
           <div>
           <label htmlFor="username" className="input-label">Name</label>
           <input type="text" className="input" placeholder="" required value={this.state.name}  onChange={this.setValue.bind(this, 'name')} />

           <label htmlFor="username" className="input-label">Product Type</label>
           <select className="myselect"  value={this.state.catid}  onChange={this.setValue.bind(this, 'catid')} required>
            <option value="">Select</option>
             {this.props.categories.map((category, i) =>
             <option key={i} value={category._id}>{category.name}</option>
             )}
           </select>

           <label htmlFor="username" className="input-label">Product Sub Type</label>
           <select className="myselect"  value={this.state.subcatid}  onChange={this.setValue.bind(this, 'subcatid')} required>
           <option value="">Select</option>
             {this.props.subcategories.map((subcategory, i) =>{
                 if (subcategory.catid === this.state.catid) {
                   return(
                     <option key={i} value={subcategory._id}>{subcategory.name}</option>
                   )
                 }
               }
             )}
           </select>


             <label htmlFor="username" className="input-label">Cost Price</label>
             <input type="number" className="input" placeholder="" required value={this.state.cprice}  onChange={this.setValue.bind(this, 'cprice')}/>

             <label htmlFor="username" className="input-label">Sell Price</label>
             <input type="number" className="input" placeholder="" required value={this.state.sprice}  onChange={this.setValue.bind(this, 'sprice')}/>

             <label htmlFor="username" className="input-label">Tax</label>
             <input type="number" className="input" placeholder=""  value={this.state.tax}  onChange={this.setValue.bind(this, 'tax')} />

             <label htmlFor="username" className="input-label">Discount in % if you want to show</label>
             <input type="number" className="input" placeholder=""  value={this.state.discount}  onChange={this.setValue.bind(this, 'discount')} />

             <label htmlFor="username" className="input-label">Stock</label>
             <input type="number" className="input" placeholder="" required value={this.state.stock}  onChange={this.setValue.bind(this, 'stock')}/>
             <button onClick={this.uploadWidget.bind(this)} className="mybutton">upload image</button>
           </div>
           <div style={{marginTop:'auto'}}>
             <button className="submit sign-up-submit" type="submit">Submit</button>
           </div>
           </form>
         </div>
       </div>
    );
  }
}
export default createContainer((props) => {
    const handle = Meteor.subscribe('subCategory');
    const handle1 = Meteor.subscribe('category');
    return {
        loading: !handle.ready(),
        subcategories: SubCategoryApi.find({}).fetch(),
        categories: CategoryApi.find({}).fetch(),
    };
}, AddProduct);
