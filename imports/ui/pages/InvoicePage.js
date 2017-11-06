import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { Invoice } from '../../api/invoice';
import InvoiceJs from '../components/invoice/Invoice';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class InvoicePage  extends Component {
  constructor(props) {
		super(props);
		this.state = {
      invoice:[],
		}
	}
  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("invoicebyshop",Session.get('shop')._id);
      let invoice = Invoice.find({shopid:Session.get('shop')._id}).fetch();
      this.setState({invoice});
    });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }

  render(){
    return(
       <div className="invoicecontainer">
       {
         this.props.loading ?  <CircularProgressbar percentage={100} initialAnimation/>  :
         <InvoiceJs invoice={this.state.invoice} />
       }
       </div>
       );
  }
}
