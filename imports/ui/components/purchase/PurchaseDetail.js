import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

 class PurchaseDetail  extends Component {
  constructor() {
    super();
      this.state={
            invoice:{},
            products:[],
      }
  }

  componentDidMount(){
    setMyState=(myresult)=> {
      this.setState({invoice:myresult,products:myresult.products});
    }
    Meteor.call('purchase.get',this.props.match.params.id,function(error,result){
        setMyState(result);
    });
  }
  myNavigation(){
    this.props.history.goBack();
  }
  render(){
    return(
       <div>
       <div style={{display:'flex',flex:1,justifyContent:'flex-start',margin:10}}>
         <button onClick={this.myNavigation.bind(this)}  className="btn btn-primary"><span className="glyphicon glyphicon-arrow-left"></span></button>
       </div>

       <div id="divcontents">
         <div style={{display:'flex',flex:1,flexFlow:'column'}}>
           <div>To,</div>
           <div style={{display:'flex',justifyContent:'center',flexFlow:'column'}}>
           <div style={{paddingLeft:50,fontSize:13,}}>{this.state.invoice.cname}</div>
           <div style={{paddingLeft:50,fontSize:13,}}>{this.state.invoice.cnumber}</div>
           </div>
         </div>

         <hr />
         <br />

       <table width="100%" >
         <thead >
           <tr>
             <th style={{fontSize:20,textAlign:'center'}}>Name</th>
             <th style={{fontSize:20,textAlign:'center'}}>Price</th>
             <th style={{fontSize:20,textAlign:'center'}}>Quantity</th>
             <th style={{fontSize:20,textAlign:'center'}}>Discount</th>
             <th style={{fontSize:20,textAlign:'center'}}>CGST/SGST</th>
             <th style={{fontSize:20,textAlign:'center'}}>Amount</th>
           </tr>
         </thead>

         <tbody>
         {this.state.products.map(
           (product,i)=>
           <tr key={i} >
           <td style={{fontSize:15,padding:15}}>{product.name}</td>
           <td style={{fontSize:15,padding:15,textAlign:'center'}}>{product.price}</td>
           <td style={{fontSize:15,padding:15,textAlign:'center'}}>{product.qty}</td>
           <td style={{fontSize:15,padding:15,textAlign:'center'}}>{product.discount}</td>
           <td style={{fontSize:15,padding:15,textAlign:'center'}}>{`${parseFloat(product.tax)/2}/${parseFloat(product.tax)/2}`}</td>
           <td style={{fontSize:15,padding:15,textAlign:'center'}}>{product.amount}</td>
           </tr>
         )}
         <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
         </tr>
         </tbody>
       </table>
       </div>
       </div>
    );
  }
}
export default withRouter(PurchaseDetail);
