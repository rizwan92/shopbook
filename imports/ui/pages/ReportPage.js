import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Invoice } from '../../api/invoice';
import { ProductMasterApi } from '../../api/productMaster';
import { NavLink ,withRouter} from 'react-router-dom';


export default class ReportPage  extends Component {
  constructor() {
    super();
    this.state={
      invoice:[],
      products:[],
      resultproducts:[],
    }
  }
  componentWillMount(){
    Tracker.autorun(() => {
      Meteor.subscribe('invoice');
      Meteor.subscribe('productMaster');
      let finalresult = ProductMasterApi.find().forEach(product => {
    let sum = 0
    let subfinalresult=Invoice.find({products:{$elemMatch:{pid:product._id}}}).forEach(invoice => {
          invoice.products.find(p =>{
            if (p.pid == product._id) {
              sum = sum + parseFloat(p.qty);
            }
          })
    })
    let newproduct =this.state.resultproducts;
        product.sold=sum;
        newproduct.push(product)
        this.setState({resultproducts:newproduct});
  })
      const invoice = Invoice.find({},{fields:{products:1}}).fetch();
      const products = ProductMasterApi.find().fetch();
      this.setState({
        invoice:invoice,
        products,
      });
    })
  }
  getdate(e){
    var today = document.getElementById("myInputDate").valueAsDate;
    console.log(today);
    console.log(new Date());
  }
  render(){

    return(
       <div>


        <div className="reportcontainer">
            <div className="reportcontent animated slideInUp">
              <div className="reporttile reportpoints">
                <div>{`Today's Profit`}
                  <p>256310</p>
                </div>
              </div>
              <div className="reporttile reportcourses">
                <div>{`This Week's Profit`}
                  <p>18</p>
                </div>
              </div>
              <div className="reporttile reportbadges">
                <div>{`This Month's Profit`}
                  <p>150</p>
                </div>
              </div>
            </div>
        </div>


        <div className="invoicelistcontainer">
        <div  className='invoice-list-div' style={{marginBottom:10}}>
          <div className='invoice-list-subdiv-name'> <NavLink  className='invoive-navlink' to={"/"} style={{display:'flex',flex:1}} >Products</NavLink></div>
          <div className='invoice-list-subdiv-number'>Total Sells</div>
          <div className='invoice-list-subdiv-date'>Earninig</div>
          <div> <input type="date" id="myInputDate" onChange={this.getdate.bind(this)} /></div>
        </div>

        {
          this.state.resultproducts.map((product,i)=>{
            return(
              <div  className='invoice-list-div' key={i}>
                <div className="invoiceavatar" >{product.productName[0]}</div>
                <div className='invoice-list-subdiv-name'> <NavLink  className='invoive-navlink' to={"/"} style={{display:'flex',flex:1}} >{product.productName}</NavLink></div>
                <div className='invoice-list-subdiv-number'>{`${product.sold} times`}</div>
                <div className='invoice-list-subdiv-date'>{parseFloat(product.sold)* parseFloat(product.mrp)} Rs.</div>
                <select></select>
              </div>
            )
          })
        }
        </div>
       </div>
    );
  }
}
