import React, { Component } from 'react';
import moment from 'moment';
export default class ShopDetail  extends Component {
  constructor() {
    super();
  }
  handleClick(){
    console.log("cliked");
  }
  render(){
    return(
      <div>
       <div className="shop-container">
          <div className="shop-container-name">{ this.props.shop.sname }</div>
          <div className="shop-container-other">{ this.props.shop.sadd }</div>
          <div className="shop-container-other">{ this.props.shop.userdetail.email }</div>
          <div className="shop-container-other">{ this.props.shop.userdetail.number }</div>
          <div className="shop-container-other">{ this.props.shop.scode }</div>
          <div className="shop-container-otherdetails">
            <div className="shop-container-otherdetails-sub1"><div className="visitname">Last Visit: </div><div className="visitname">{moment(this.props.visit.createdAt).fromNow()}</div></div>
            <div className="shop-container-otherdetails-sub2"><span className="glyphicon glyphicon-eye-open visibilityicon" data-toggle="tooltip" title="visits"></span><div className="visitname"></div><div className="visitname">{this.props.visit.visit+1}</div></div>
          </div>
       </div>
     </div>
    );
  }
}
