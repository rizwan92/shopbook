import React, { Component } from 'react';
import Header from './header/Header';
import {Tracker} from 'meteor/tracker';
import {ProductMasterApi} from '../../api/productMaster';

export default class ProductEdit  extends Component {
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
    }
  }

  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("productMasterbyindividual",this.props.match.params.id);
      let product = ProductMasterApi.find({_id:this.props.match.params.id}).fetch();
      if (product[0]) {
        this.setState({
          name:product[0].name,
          costprice:product[0].costprice,
          sellprice:product[0].sellprice,
          tax:product[0].tax,
          discount:product[0].discount,
          stock:product[0].stock,
          hsncode:product[0].hsncode,
          unit:product[0].unit,
        });
      }
    });
}
componentWillUnmount(){
this.linktracker.stop();
}
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

    const product = {
      name,costprice,sellprice,tax,discount,stock,hsncode,unit
    }

    Meteor.call('product.update',this.props.match.params.id,product,(error,result)=>{
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
    return(
      <div>
      <Header name="Shopbook" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">


          <div className="mainlayout-container">
            <div className="mainlayoutone"></div>
            <div className="mainlayouttwo">



            <div>
              <div className="addproduct-container">
                <h2>Update {this.state.name}</h2>
                <form onSubmit={this.handleRSubmit.bind(this)}>
                <div>

                <label htmlFor="username" className="input-label">Movie Name</label>
                <input type="text" className="input" placeholder="" required value={this.state.name}  onChange={this.setValue.bind(this, 'name')} />

                <label htmlFor="username" className="input-label">Select State</label>
                <select className="myselect"  value={this.state.category}  onChange={this.setValue.bind(this, 'category')} required>
                <option value="">Select category</option>
                <option value="Bollywood">Bollywood</option>
                <option value="Hollywood">Hollywood</option>
                <option value="TVShow">TVShow</option>
                </select>

                <label htmlFor="username" className="input-label">Description</label>
                <input type="text" className="input" placeholder="" id="pac-input1"  value={this.state.description}  onChange={this.setValue.bind(this, 'description')} />

                <label htmlFor="username" className="input-label">length</label>
                <input type="text" className="input" placeholder=""  value={this.state.length}  onChange={this.setValue.bind(this, 'length')}/>

                <label htmlFor="username" className="input-label">Rating</label>
                <input type="text" className="input" placeholder=""  value={this.state.rating}  onChange={this.setValue.bind(this, 'rating')}/>

                <label htmlFor="username" className="input-label">Quality</label>
                <input type="text" className="input" placeholder=""  value={this.state.quality}  onChange={this.setValue.bind(this, 'quality')}/>

                <label htmlFor="username" className="input-label">Size in</label>
                <select className="myselect"  value={this.state.sizein}  onChange={this.setValue.bind(this, 'sizein')} >
                <option value="">Select category</option>
                <option value="KB">KB</option>
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                </select>

                <label htmlFor="username" className="input-label">Size</label>
                <input type="text" className="input" placeholder=""  value={this.state.size}  onChange={this.setValue.bind(this, 'size')}/>

                <label htmlFor="username" className="input-label">Download Link</label>
                <input type="text" className="input" placeholder=""  value={this.state.dlink}  onChange={this.setValue.bind(this, 'dlink')}/>

                <input type="checkbox" onChange={this.hableImagecondition.bind(this)} />

                {
                  this.state.condition ?
                  <div>
                    <label htmlFor="username" className="input-label">imageLink</label>
                    <input type="text" className="input" placeholder=""  value={this.state.imageLink}  onChange={this.setValue.bind(this, 'imageLink')}/>
                  </div>
                  :
                  <button onClick={this.uploadWidget.bind(this)} className="mybutton">upload image</button>
                }

                </div>
                <div style={{marginTop:'auto'}}>
                  <button className="submit sign-up-submit" type="submit">Submit</button>
                </div>
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
    );
  }
}
