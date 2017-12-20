import React, { Component } from 'react';
import Header from '../components/header/Header';
import {Route, Link, NavLink, withRouter, Redirect} from 'react-router-dom';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import BillingPanel from '../components/BillingPanel'
import ProductMaster from '../components/productMaster/ProductMaster'
import InvoicePage from '../pages/InvoicePage';
import InvoiceDetail from '../components/invoice/InvoiceDetail';
import PurchasePage from '../pages/PurchasePage';
import PurchaseDetail from '../components/purchase/PurchaseDetail';
import QRCodePage from '../pages/QRCodePage';
import ReportPage from '../pages/ReportPage';

const data = [
  {
    link: '/billbook',
    name: 'Home'
  }, {
    link: '/billbook/productmaster',
    name: 'Products'
  }, {
    link: '/billbook/invoice',
    name: 'Invoice'
  }, {
    link: '/billbook/purchase',
    name: 'Purchase'
  }, {
    link: '/billbook/report',
    name: 'Reports'
  }, {
    link: '/billbook/qrcode',
    name: 'QRCodes'
  }
];
const Links = (props) => (
  <div>
    {data.map((dat, i) => <NavLink activeClassName={dat.name === 'Home'? '' :  'selected' } key={i} className="sidebar" to={dat.link}>{dat.name}</NavLink>)}
  </div>
);

export default class BillBookLayout  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <div  style={{height: '100%'}}>
             <div>
            <Header name="BILLBOOK"/>
            <div className="container-fluid">
              <Row style={{marginTop:50}}>
                <Col sm={2}  className="mysidebar">
                  <Links match={this.props.match}/>
                </Col>
                <Col sm={10} style={{backgroundColor:'white'}}>
                <Route exact path="/billbook" component={BillingPanel}/>
                <Route exact path="/billbook/productmaster" component={ProductMaster}/>
                <Route exact path="/billbook/invoice" component={InvoicePage}/>
                <Route exact path="/billbook/invoice/:id" component={InvoiceDetail}/>
                <Route exact path="/billbook/purchase" component={PurchasePage}/>
                <Route exact path="/billbook/purchase/:id" component={PurchaseDetail}/>
                <Route exact path="/billbook/qrcode" component={QRCodePage}/>
                <Route exact path="/billbook/report" component={ReportPage}/>
                </Col>
              </Row>
            </div>
          </div>
      </div>
    );
  }
}
