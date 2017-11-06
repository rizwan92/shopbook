import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';
import { PurchaseApi } from '../../api/purchase';
import Purchase from '../components/purchase/Purchase';

export default class PurchasePage  extends Component {
  constructor(props) {
		super(props);
		this.state = {
      purchase:[],
		}
	}
  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("purchasebyshiopid",Session.get('shop')._id);
      let purchase = PurchaseApi.find({shopid:Session.get('shop')._id}).fetch();
      this.setState({purchase});
    });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }

  render(){
    return(
       <div className="invoicecontainer">
         <Purchase purchase={this.state.purchase} />
       </div>
       );
  }
}
