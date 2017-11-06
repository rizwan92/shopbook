import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { NavLink ,withRouter} from 'react-router-dom';
class InvoiceJs  extends Component {
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
    let nowdate = new Date();
    let date= nowdate.getDate()
    let month=nowdate.getMonth()
    let year =nowdate.getFullYear()
    let formonth= new Date(`${year}/${month}`);
    let forweek= new Date(`${year}/${++month}`);
    let fortoday  = new Date(`${year}/${++month}`);
    const monthinvoice = this.props.invoice.filter((invoice)=>{
      if (invoice.createdAt < nowdate && invoice.createdAt > formonth) {
        return(invoice);
      }
    })
    const todayinvoice = this.props.invoice.filter((invoice)=>{
      if (invoice.createdAt< nowdate && invoice.createdAt > formonth) {
        return(invoice);
      }
    })
    let filterText=this.props.invoice.filter(
       (invoice)=>{
     return (invoice.to.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !==-1);
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
            <div className="invoiceavatar" onClick={this.handleNavigation.bind(this,invoice._id)}>{invoice.to[0]}</div>
            <div className='invoice-list-subdiv-name'> <NavLink  className='invoive-navlink' style={{display:'flex',flex:1}} to={`invoice/${invoice._id}`} >{invoice.to.toUpperCase()}</NavLink></div>
            <div className='invoice-list-subdiv-number'>{invoice.tonumber}</div>
            <div className='invoice-list-subdiv-date'>{`${invoice.createdAt.getDate()}/${invoice.createdAt.getMonth()}/${invoice.createdAt.getFullYear()}`}</div>
            <div  onClick={ ()=> this.deleteProduct(invoice._id) }style={{position:'relative',top:0,right:2,paddingLeft:10,paddingRight:10}}><span style={{color:'#999'}} className="glyphicon glyphicon-trash btn-lg"></span></div>
          </div>
       )}
       </div>
       </div>
    );
  }
}
export default withRouter(InvoiceJs);
