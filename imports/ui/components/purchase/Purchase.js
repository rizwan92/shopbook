import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { NavLink } from 'react-router-dom';
export default class Purchase  extends Component {
  constructor() {
    super();
      this.state={
          filterText:"",
      }
  }
  deleteProduct(id){
    let result = confirm("Want to delete?");
  if (result) {
   Meteor.call('invoice.remove',id);
    }
}
handleNavigation(id){
   this.props.history.push(`invoice/${id}`);
}
 setValue(field, event) {
  let object = {};
  object[field] = event.target.value;
  this.setState(object);
}
  render(){
    const monthinvoice = this.props.purchase.filter((purchase)=>{
      return(purchase.createdAt.getMonth()==new Date().getMonth());
    })
    let filterText=this.props.purchase.filter(
       (purchase)=>{
     return (purchase.cname.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !==-1);
   }
 );

    return(
       <div>
       <div className="invoicesearch">
       <div className="invoicesearchsub">
       <input type="text" placeholder="Search..." className="invoicesearchinput" value={this.state.filterText}  onChange={this.setValue.bind(this, 'filterText')}/>
       </div>
       <div className="invoicesearchsub"><div className="lastmonth">last month</div><div className="lastmonth">{monthinvoice.length}</div></div>
       <div className="invoicesearchsub"><div className="lastmonth">last week</div><div className="lastmonth">40</div></div>
       <div className="invoicesearchsub"><div className="lastmonth">today</div><div className="lastmonth">40</div></div>
       </div>
       <div className="invoicelistcontainer">
       {filterText.map((invoice,i)=>
          <div  className='invoice-list-div' key={i} >
          <div className="invoiceavatar" onClick={this.handleNavigation.bind(this,invoice._id)}>{invoice.cname[0]}</div>
            <div className='invoice-list-subdiv-name'> <NavLink  className='invoive-navlink' style={{display:'flex',flex:1}} to={`purchase/${invoice._id}`} >{invoice.cname.toUpperCase()}</NavLink></div>
            <div className='invoice-list-subdiv-number'>{invoice.cnumber}</div>
            <div className='invoice-list-subdiv-date'>{`${invoice.createdAt.getDate()}/${invoice.createdAt.getMonth()}/${invoice.createdAt.getFullYear()}`}</div>
            <div  onClick={ ()=> this.deleteProduct(invoice._id) }style={{position:'relative',top:0,right:2,paddingLeft:10,paddingRight:10}}><span style={{color:'red'}} className="glyphicon glyphicon-trash"></span></div>
          </div>
       )}
       </div>
       </div>
    );
  }
}
