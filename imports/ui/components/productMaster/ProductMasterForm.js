import React, { Component } from 'react';
import { Session } from 'meteor/session';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';

export default class ProductMasterForm extends Component {
  constructor() {
    super();
    this.state={
      productName:'',
      category:'',
      subCategory:'',
      hsnCode:'',
      mrp:0,
      uom:'',
      tax:0,
      purchasePrice:0,
      status:1,
      stock:0,
      createdAt: new Date(),
          }
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
  handleSubmit(event) {
       event.preventDefault();
       const productName = this.state.productName.trim();
       const category =this.state.category.trim();
       const subCategory = this.state.subCategory.trim();
       const hsnCode = this.state.hsnCode.trim();
       const mrp = this.state.mrp.trim();
       const uom = this.state.uom.trim();
       const tax = this.state.tax.trim();
       const purchasePrice = this.state.purchasePrice.trim();
       const status = this.state.status
       const stock = this.state.stock.trim();
        let product = {
          userid:Session.get('shop').userid,
          shopid:Session.get('shop')._id,
          productName:productName,
          category:category,
          subCategory:subCategory,
          hsnCode:hsnCode,
          mrp:mrp,
          uom:uom,
          tax:tax,
          purchasePrice:purchasePrice,
          status:status,
          stock:stock,
        }
          Meteor.call('product.insert', product);
       this.setState({
      productName: '',
      category: '',
      subCategory: '',
      hsnCode: '',
      mrp: '',
      uom: '',
      tax: '',
      purchasePrice: '',
      status: 1,
      stock: '',
    });
    }
  render(){
    return(
       <div>
       <Form  onSubmit={this.handleSubmit.bind(this)}>
         <FormGroup controlId="formHorizontalEmail">
           <Col style={{color:'black'}} componentClass={ControlLabel} sm={4} >
             Product Name
           </Col>
           <Col sm={8}>
             <FormControl type="text" bsSize="small" placeholder="productName" value={this.state.productName}  onChange={this.setValue.bind(this, 'productName')} autoFocus  required/>
           </Col>
         </FormGroup>


         <FormGroup controlId="formHorizontalPassword">
           <Col style={{color:'black'}} componentClass={ControlLabel} sm={4}>
           HSN Code
           </Col>
           <Col sm={8}>
             <FormControl type="number" bsSize="small" placeholder="hsnCode" value={this.state.hsnCode} onChange={this.setValue.bind(this, 'hsnCode')} />
           </Col>
         </FormGroup>

         <FormGroup controlId="formHorizontalPassword">
           <Col style={{color:'black'}} componentClass={ControlLabel} sm={4}>
           Sell Price
           </Col>
           <Col sm={8}>
             <FormControl type="number" bsSize="small" placeholder="mrp" value={this.state.mrp} onChange={this.setValue.bind(this, 'mrp')} required/>
           </Col>
         </FormGroup>

         <FormGroup controlId="formControlsSelect">
          <Col style={{color:'black'}} componentClass={ControlLabel} sm={4}>
           <ControlLabel>Unit</ControlLabel>
           </Col>
            <Col sm={8}>
           <FormControl style={{color:'black'}} componentClass="select" placeholder="Unit Of Measurement" bsSize="small" value={this.state.uom}  onChange={this.setValue.bind(this, 'uom')} required>
             <option value="">select</option>
             <option value="Kg">Kg</option>
             <option value="piece">piece</option>
             <option value="bag">bag</option>
             <option value="liter">liter</option>
             <option value="meeter">meeter</option>
           </FormControl>
            </Col>
         </FormGroup>
         <FormGroup controlId="formHorizontalPassword">
           <Col style={{color:'black'}} componentClass={ControlLabel} sm={4}>
           tax
           </Col>
           <Col sm={8}>
             <FormControl type="number" bsSize="small" placeholder="tax" value={this.state.tax} onChange={this.setValue.bind(this, 'tax')} required/>
           </Col>
         </FormGroup>

         <FormGroup controlId="formHorizontalPassword">
           <Col style={{color:'black'}} componentClass={ControlLabel} sm={4}>
           Cost Price
           </Col>
           <Col sm={8}>
             <FormControl type="number" bsSize="small" placeholder="purchasePrice" value={this.state.purchasePrice} onChange={this.setValue.bind(this, 'purchasePrice')} required/>
           </Col>
         </FormGroup>

         <FormGroup controlId="formHorizontalPassword">
           <Col style={{color:'black'}} componentClass={ControlLabel} sm={4}>
           stock
           </Col>
           <Col sm={8}>
             <FormControl type="number" bsSize="small" placeholder="stock" value={this.state.stock} onChange={this.setValue.bind(this, 'stock')} required/>
           </Col>
         </FormGroup>

         <FormGroup>
           <Col smOffset={4} sm={8}>
             <Button type="submit" bsStyle="primary" style={{margin:8}}>
               Submit
             </Button>
           </Col>
         </FormGroup>
       </Form>
       </div>
    );
  }
}
