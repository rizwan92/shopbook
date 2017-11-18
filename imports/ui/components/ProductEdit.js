import React, { Component } from 'react';
import Header from './header/Header';
import { PropertyApi } from '../../api/property';
import { createContainer } from 'meteor/react-meteor-data';

 class ProductEdit  extends Component {
  constructor() {
    super();
    this.state= {
      name:'',
      costprice:'',
      sellprice:'',
      tax:'',
      discount:'',
      stock:'',
      hsncode:'',
      unit:'',
      catid:'',
      subcatid:'',
      image:'',
      condition:true,
    }
  }
  hableImagecondition(){
    this.setState({condition:!this.state.condition})
  }
  uploadWidget(event) {
  event.preventDefault();
  let setImagelinkState = (link)=> {
    this.setState({image:link});
  }

       cloudinary.openUploadWidget({ cloud_name: 'dcr2pfgxy', upload_preset: 'kzkxno3w', tags:['xmas']},
           function(error, result) {
               setImagelinkState(result[0].secure_url);
           });
   }
  componentWillMount(){
    let product = this.props.product[0];
        let keyarray = Object.keys(product);
        let newobj = {};
        keyarray.map((keys)=>{
          newobj[keys] = product[keys]
        })
      this.setState(newobj);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.product != null) {
  //     let product = this.props.product[0]
  //       if (product) {
  //         this.setState({
  //           name:product.name,
  //           costprice:product.costprice,
  //           sellprice:product.sellprice,
  //           tax:product.tax,
  //           discount:product.discount,
  //           stock:product.stock,
  //           hsncode:product.hsncode,
  //           unit:product.unit,
  //           catid:product.catid,
  //           subcatid:product.subcatid,
  //         },()=>{
  //         });
  //       }
  //   }
  // }

  handleRSubmit(event) {
    event.preventDefault();
    const name = this.state.name.trim();
    const costprice = this.state.costprice.trim();
    const sellprice = this.state.sellprice.trim();
    const tax = this.state.tax;
    const discount = this.state.discount.trim();
    const stock = this.state.stock.trim();
    const hsncode = this.state.hsncode.trim();
    const unit = this.state.unit.trim();
    const image = this.state.image.trim();
    const catid = this.state.catid.trim();
    const subcatid = this.state.subcatid.trim();


      let product = this.props.product[0];
      product.name = name;
      product.costprice = costprice;
      product.sellprice = sellprice;
      product.tax = tax;
      product.discount = discount;
      product.image = image;
      product.stock = stock;
      product.hsncode = hsncode;
      product.unit = unit;
      product.unit = unit;
      product.catid = subcatid;

    this.props.properties.map((property)=>{
        product[property.name] = this.state[property.name];
    })


    Meteor.call('product.update',this.props.product[0]._id,product,(error,result)=>{
      if (result) {
        Bert.alert( 'Successfully updated', 'success', 'growl-top-right' );
      }
     })

  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }

  render(){
    let myproduct =this.props.product[0];
    return(
      <div>
        <div className="mainlayout-container1">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">



            <div>
              <div className="addproduct-container">
                <h3>Update {this.state.name}</h3>
                <form onSubmit={this.handleRSubmit.bind(this)}>
                <div>

                <label htmlFor="username" className="input-label">Name</label>
                <input type="text" className="form-control" placeholder="" required value={this.state.name}  onChange={this.setValue.bind(this, 'name')} />

                <label htmlFor="username" className="input-label">Product Type</label>
                <select className="form-control"  value={this.state.catid}  onChange={this.setValue.bind(this, 'catid')} required>
                <option value="">Select</option>
                  {this.props.categories.map((category, i) =>
                  <option key={i} value={category._id}>{category.name}</option>
                  )}
                </select>

                <label htmlFor="username" className="input-label">Product Sub Type</label>
                <select className="form-control"  value={this.state.subcatid}  onChange={this.setValue.bind(this, 'subcatid')} required>
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
                  <input type="number" className="form-control" placeholder="" required value={this.state.costprice}  onChange={this.setValue.bind(this, 'costprice')}/>

                  <label htmlFor="username" className="input-label">Sell Price</label>
                  <input type="number" className="form-control" placeholder="" required value={this.state.sellprice}  onChange={this.setValue.bind(this, 'sellprice')}/>

                  <label htmlFor="username" className="input-label">Tax</label>
                  <input type="number" className="form-control" placeholder=""  value={this.state.tax}  onChange={this.setValue.bind(this, 'tax')} />

                  <label htmlFor="username" className="input-label">Discount in % if you want to show</label>
                  <input type="number" className="form-control" placeholder=""  value={this.state.discount}  onChange={this.setValue.bind(this, 'discount')} />

                  <label htmlFor="username" className="input-label">HSN CODE</label>
                  <input type="number" className="form-control" placeholder=""  value={this.state.hsncode}  onChange={this.setValue.bind(this, 'hsncode')} />

                  <label htmlFor="username" className="input-label">Unit</label>
                  <input type="text" className="form-control" placeholder=""  value={this.state.unit}  onChange={this.setValue.bind(this, 'unit')} />

                  <label htmlFor="username" className="input-label">Stock</label>
                  <input type="number" className="form-control" placeholder="" required value={this.state.stock}  onChange={this.setValue.bind(this, 'stock')}/>

                <input type="checkbox" onChange={this.hableImagecondition.bind(this)} />

                {
                  this.state.condition ?
                  <div>
                    <label htmlFor="username" className="input-label">image</label>
                    <input type="text" className="form-control" placeholder=""  value={this.state.image}  onChange={this.setValue.bind(this, 'image')}/>
                  </div>
                  :
                  <button onClick={this.uploadWidget.bind(this)} className="mybutton">upload image</button>
                }

                {
                  this.props.properties == null ? null :
                  this.props.properties.map((property,i)=>{
                    return(
                      <div key={i}>
                      <label htmlFor="username" className="input-label">{property.name}</label>
                      <input type="text" className="form-control" placeholder=""  value={this.state[`${property.name}`]}  onChange={this.setValue.bind(this, `${property.name}`)}/>
                      </div>
                    )
                  })

                }

                </div>
                <div style={{marginTop:10}}>
                  <button className="submit sign-up-submit" type="submit">Submit</button>
                </div>
                </form>
              </div>
            </div>


          </div>
          <div className="mainlayoutthree"></div>
        </div>
      </div>
    );
  }
}
export default createContainer((props) => {
    const handle = Meteor.subscribe('propertysubcatid',props.product[0].subcatid);
    return {
        loading: !handle.ready(),
        properties : handle.ready() ? PropertyApi.find({subcatid:props.product[0].subcatid}).fetch() : null,
    };
}, ProductEdit);
