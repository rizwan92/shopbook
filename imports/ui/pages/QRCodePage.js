import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Barcode from 'react-barcode';
import CircularProgressbar from 'react-circular-progressbar';
import { ProductMasterApi } from '../../api/productMaster';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';

 export default class QRCodePage extends Component {
  constructor() {
    super();
      this.state={
            productid:'example',
      }
  }
  setQRCode(event){
      this.setState({ productid: event.target.value })
  }
  render(){
    return(
       <div>
      {
        this.props.loading ?  <CircularProgressbar percentage={100} initialAnimation/>  :
        <div>
      <h1>QR Code</h1>

      <Form horizontal>
      <FormGroup controlId="formControlsSelect">
       <Col componentClass={ControlLabel} sm={2}>
        <ControlLabel>Products</ControlLabel>
        </Col>
         <Col sm={10}>
        <FormControl componentClass="select" placeholder="Select Product"   onChange={this.setQRCode.bind(this)} required>
          <option value="example">select</option>
            {this.props.products.map((product, i) =>
              <option key={i} value={product._id}>{product.productName}</option>
            )}
        </FormControl>
         </Col>
      </FormGroup>
        </Form>

         <Barcode value={this.state.productid} />
        </div>
      }
       </div>
    );
  }
}
