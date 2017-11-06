import React, { Component } from 'react';
import { Session } from 'meteor/session';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Table from 'react-bootstrap/lib/Table';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import  Autocomplete  from 'react-autocomplete';
import {Tracker} from 'meteor/tracker';
import {ProductMasterApi} from '../../api/productMaster'

export default class BillingPanel  extends Component {
  constructor() {
    super();
    this.state = {
      d : new Date(),
      isInvoice : true,
      username : "",
      usernumber : "",
      filterText : "",
      autocompletetext : "",
      name : "",
      number : "",
      total : 0,
      products : [],
      masterproducts : [],
    };
  }
  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("productMasterbyid",Session.get('shop')._id);
    let masterproducts = ProductMasterApi.find({shopid:Session.get('shop')._id}).fetch();
    this.setState({masterproducts});
    });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }

  handleUserInput(filterText) {
   this.setState({filterText: filterText});
 };
 handleRowDel(product) {
   let index = this.state.products.indexOf(product);
   this.state.products.splice(index, 1);
   this.setState(this.state.products);
 };

 createPurchaseInvoice(){
   if (this.state.username==='') {
     Bert.alert( 'Enter Billing name', 'danger', 'growl-top-right' );
     return false;
   }
   if (this.state.usernumber==='') {
     Bert.alert( 'Enter Billing number', 'danger', 'growl-top-right' );
     return false;
   }

   if (this.state.products.length==0) {
     Bert.alert( 'Insert Product first', 'danger', 'growl-top-right' );
    }else {
        Meteor.call('purchase.insert',Session.get('shop').userid,Session.get('shop')._id,this.state.username,this.state.usernumber,this.state.products)
        Bert.alert( 'SuccessFully Created Purchaseinvoice', 'success', 'growl-top-right' );

      }
 }

 handleAddEvent(evt) {
   let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
   let product = {
     id:'S'+id,
     pid:'S',
     name:'',
     price:0,
     qty: 1,
     tax: 0,
     discount:'',
     amount:0 ,
   }
   this.state.products.push(product);
   this.setState(this.state.products);
 }

 handleAutocompleteAddEvent(obj) {
   let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
   let tax = parseFloat(obj.sellprice) * parseFloat(obj.tax)/100;
   let amount= parseFloat(obj.sellprice) +tax ;
   let product = {
     id:id,
     pid:obj._id,
     name:obj.name,
     price: obj.sellprice,
     qty: '1',
     tax: obj.tax,
     discount: 0,
     amount:amount ,
   }

   this.state.products.push(product);
   this.setState(this.state.products);
 }
 handleProductTable(evt) {
    let item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
let products = this.state.products.slice();
  let newProducts = products.map(function(product) {

    for (var key in product) {
      if (key == item.name && product.id == item.id) {
          if (key==="qty") {
            if (item.value>=1) {
              let price=  parseFloat(product.price);
              let qty=  parseFloat(item.value);
              let tax=  parseFloat(product.tax);
              let discount = parseFloat(product.discount);
              let amount =price * qty;
              let totaldiscount=0;
              let totaltax=0;
              if (discount) {
                  totaldiscount = amount *discount/100;
                  amount = amount - totaldiscount;
              }
                    totaltax   = amount * tax/100;
                    amount = amount + totaltax;
                    product["amount"] = amount;
            }
          }
          if (key==="discount") {
            let price=  parseFloat(product.price);
            let qty=  parseFloat(product.qty);
            let tax=  parseFloat(product.tax);
            let discount = parseFloat(item.value);
            let amount =price * qty;
            let totaldiscount=0;
            let totaltax=0;
            if (discount) {
                totaldiscount = amount *discount/100;
                amount = amount - totaldiscount;
            }
                  totaltax   = amount * tax/100;
                  amount = amount + totaltax;
                  product["amount"] = amount;
          }
          if (key==="price") {
          let price=  parseFloat(item.value);
          let qty=  parseFloat(product.qty);
          let tax=  parseFloat(product.tax);
          let discount = parseFloat(product.discount);
          let amount =price * qty;
          let totaldiscount=0;
          let totaltax=0;
          if (discount) {
              totaldiscount = amount *discount/100;
              amount = amount - totaldiscount;
          }
                totaltax   = amount * tax/100;
                amount = amount + totaltax;
                product["amount"] = amount;
          }
          if (key==="tax") {
          let price=  parseFloat(product.price);
          let qty=  parseFloat(product.qty);
          let tax=  parseFloat(item.value);
          let discount = parseFloat(product.discount);
          let amount =price * qty;
          let totaldiscount=0;
          let totaltax=0;
          if (discount) {
              totaldiscount = amount *discount/100;
              amount = amount - totaldiscount;
          }
                totaltax   = amount * tax/100;
                amount = amount + totaltax;
                product["amount"] = amount;
          }
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
  //  console.log(this.state.products);
  };
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 windowPrint(){
   if (this.state.username==='') {
     Bert.alert( 'Enter Billing name', 'danger', 'growl-top-right' );
     return false;
   }
   if (this.state.usernumber==='') {
     Bert.alert( 'Enter Billing number', 'danger', 'growl-top-right' );
     return false;
   }

  if (this.state.products.length==0) {
    Bert.alert( 'Insert Product first', 'danger', 'growl-top-right' );
  }else{
    this.state.products.map(
      (myproduct)=>{
        if (myproduct.pid==="S") {
            let stock= prompt('Please Enter stock for '+myproduct.name);
            if (stock) {
              let product = {
                userid:Session.get('shop').userid,
                shopid:Session.get('shop')._id,
                shopdetail:Session.get('shop'),
                name:myproduct.name,
                discount:myproduct.discount,
                category:'',
                subCategory:'',
                hsnCode:'',
                sprice:myproduct.price,
                uom:'',
                tax:myproduct.tax,
                cprice:'',
                status:1,
                stock:stock,
              }
                Meteor.call('product.insert', product);
            }else {

            }

        }
          if (myproduct.pid!="S") {
            Meteor.call('product.updatequantity',myproduct.pid,myproduct.qty);
          }
      }
    )
      Meteor.call('invoice.insert',Session.get('shop').userid,Session.get('shop')._id,this.state.username,this.state.usernumber,this.state.products);
      var content = document.getElementById("divcontents");
      var pri = document.getElementById("ifmcontentstoprint").contentWindow;
      pri.document.open();
      pri.document.write(content.innerHTML);
      pri.document.close();
      pri.focus();
      pri.print();
  }

 }
  render(){
          let productcount=0;
          let count =0;
          let total = [];
          total=this.state.products.map(
            (product)=>{
              count = count + parseFloat(product.amount);
              return (count);
            }
          );
    let filterProducts=this.state.masterproducts.filter(
       (product)=>{
     return (product.name.toLowerCase().indexOf(this.state.autocompletetext.toLowerCase()) !==-1);
   }
);
    return(
      <div>
        <div  className="billingcontainer">
            <div className="billingnamecounter">
                  <input className="billingcounterinput" type="text" placeholder="Name" value={this.state.username}onChange={this.setValue.bind(this, 'username')} />
                  <input className="billingcounterinput" type="number" placeholder="Number" value={this.state.usernumber}onChange={this.setValue.bind(this, 'usernumber')} />
            </div>
            <div>
              <div className="shodnameclass">{Session.get('shop').sname}</div>
              <div className="shopdetailclass">{Session.get('shop').sadd}</div>
              <div className="shopdetailclass">{Session.get('shop').userdetail.number}</div>
              <div className="shopdetailclass">{Session.get('shop').scode}</div>
              <div className="shopdetailclass">Purchase  <input type="checkbox"  onClick={()=>{this.setState({isInvoice:!this.state.isInvoice})}} /></div>
            </div>
        </div>

        <div style={styles.container} className="billincountersearchfilter">
          <div style={styles.one}>
          <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
          </div>
          <div style={styles.two}>
          <Autocomplete

                     inputProps={{ placeholder:'Search..',className:'billincountersearch'}}
                     getItemValue={(item) => item._id}
                     items={filterProducts}
                     renderItem={(item, isHighlighted) =>
                       {
                         return(<div className="myselectdiv" style={{background: isHighlighted ? 'lightgray' : 'white',}}>
                         <div className="myselectdiv-subdiv">{item.name}</div>
                         <div className="myselectdiv-subdiv">{item.sellprice}Rs.</div>
                         </div>);
                        }}
                     value={this.state.autocompletetext}
                     onChange={(e,v) => {
                       this.setState({autocompletetext:v});
                     } }
                     onSelect={(val) =>{
                       let result = filterProducts.filter(function( obj ) {
                         return obj._id == val;
                       });
                         this.handleAutocompleteAddEvent(result[0]);
                     }}
                 />
          </div>
          <div style={styles.three} className="total">Total:{total[total.length-1]}</div>
        </div>


            <div id="divcontents" style={{display:'none',padding:10}}>





            <div style={{display:'flex',flex:1}}>
              <div style={{flex:1}}>
                <h1 style={{fontSize:13,margin:5,}}>{Session.get('shop').sname}</h1>
                <p style={{fontSize:13,margin:5,}}>GSTIN:-{Session.get('shop').scode}</p>
                <p style={{fontSize:13,margin:5,}}>Address:-{Session.get('shop').sadd}</p>
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:13,margin:5,}}>Mob:-{Session.get('shop').userdetail.number}</p>
                <p style={{fontSize:13,margin:5,}}>Email:-{Session.get('shop').userdetail.email}</p>
                <p style={{fontSize:13,margin:5,}}>Date:- { Session.get('shop').createdAt.getDate()+'/'+Session.get('shop').createdAt.getMonth()+'/'+Session.get('shop').createdAt.getFullYear()}</p>
              </div>
            </div>

              <hr />

              <div style={{display:'flex',flex:1,flexFlow:'column'}}>
                <div>To,</div>
                <div style={{display:'flex',justifyContent:'center',flexFlow:'column'}}>
                <div style={{paddingLeft:50,fontSize:13,}}>{this.state.username}</div>
                <div style={{paddingLeft:50,fontSize:13,}}>{this.state.usernumber}</div>
                </div>
              </div>

              <hr />
              <br />

            <table width="100%" >
              <thead >
                <tr>
                  <th style={{fontSize:12,}}>Name</th>
                  <th style={{borderLeft: '0.5px solid black',fontSize:12,}}>Price</th>
                  <th style={{borderLeft: '0.5px solid black',fontSize:12,}}>Quantity</th>
                  <th style={{borderLeft: '0.5px solid black',fontSize:12,}}>Discount</th>
                  <th style={{borderLeft: '0.5px solid black',fontSize:12,}}>CGST/SGST</th>
                  <th style={{borderLeft: '0.5px solid black',fontSize:12,}}>Amount</th>
                </tr>
              </thead>

              <tbody>
                {this.state.products.map(
                  (product,i)=>
                  <tr key={i} >
                  <td style={{fontSize:11}}>{product.name}</td>
                  <td style={{textAlign:'center',fontSize:11,}}>{product.price}</td>
                  <td style={{textAlign:'center',fontSize:11,}}>{product.qty}</td>
                  <td style={{textAlign:'center',fontSize:11,}}>{product.discount}</td>
                  <td style={{textAlign:'center',fontSize:11,}}>{`${parseFloat(product.tax)/2}/${parseFloat(product.tax)/2}`}</td>
                  <td style={{textAlign:'center',fontSize:11,}}>{product.amount}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <hr />

            <div style={{display:'flex',justifyContent:'center',flexFlow:'column'}}>
            <h5>Bank Details</h5>
            <p style={{fontSize:10,margin:0,}}>Bank:-Bank name and accounttypr</p>
            <p style={{fontSize:10,margin:0,}}>A/c:-account name</p>
            <p style={{fontSize:10,margin:0,}}>A/c type:-aving current</p>
            <p style={{fontSize:10,margin:0,}}>IFSC:-ifsc</p>
            </div>

            <br />
            <br />
            <hr />
            <br />
            <br />
            </div>
          <iframe id="ifmcontentstoprint"  style={{position: "absolute", top: '-100vh'}}></iframe>
         <ProductTable isInvoice={this.state.isInvoice} purchase={this.createPurchaseInvoice.bind(this)} onProductTableUpdate={this.handleProductTable.bind(this)} print={this.windowPrint.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>

       </div>
    );
  }
}
const styles={
  container:{
    display:'flex',
    flex:1,
    alignItems:'center',
  },
  one:{
    flex:1,
    display:'flex',
    justifyContent:'flex-start',
  },
  two:{
    display:'flex',
    flex:1,
    justifyContent:'center',
    zIndex:1,

  },
  three:{
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

}

class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>

        <input type="text" placeholder="Filter..." className="billincounterfilter" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>

      </div>

    );
  }

}

class ProductTable extends React.Component {

  createPurchaseInvoice(){
    this.props.purchase();
  }
  render() {
    let onProductTableUpdate = this.props.onProductTableUpdate;
    let rowDel = this.props.onRowDel;
    let filterText = this.props.filterText;
    let product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });

    return (
      <div className="invoicetable">
        <Table responsive className="mytableinvoice"  >
          <thead>
            <tr >
              <th className="table-div">Name</th>
              <th className="table-div">Price</th>
              <th className="table-div">Quantity</th>
              <th className="table-div">Discount</th>
              <th className="table-div">CGST/SGST</th>
              <th className="table-div">Amount</th>
              <th className="table-div">Action</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>

        </Table>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-primary pull-right" style={{margin:5}}><span className="glyphicon glyphicon-plus"></span></button>
        {
          this.props.isInvoice ?
          <button type="button" onClick={this.props.print}    className="btn btn-success pull-right" style={{margin:5}}><span className="glyphicon glyphicon-print"></span> Invoice</button>
            :
          <button type="button" onClick={this.createPurchaseInvoice.bind(this)}    className="btn btn-success pull-right" style={{margin:5}}><span className="glyphicon glyphicon-print"></span> Purchase</button>
        }
      </div>
    );

  }

}
class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {

    return (
      <tr className="">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{type: "name",value: this.props.product.name,id: this.props.product.id}}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{type: "price",value: this.props.product.price,id: this.props.product.id}}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{type: "qty",value: this.props.product.qty,id: this.props.product.id}}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{type: "discount",value: this.props.product.discount,id: this.props.product.id}}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{type: "tax",value: this.props.product.tax,id: this.props.product.id}}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{type: "amount",value: this.props.product.amount,id: this.props.product.id}}/>
        <td className="del-cell">
          <button  onClick={this.onDelEvent.bind(this)}  className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span></button>
        </td>
      </tr>
    );

  }

}

class EditableCell extends React.Component {

  render() {
    return (
      <td width={this.props.cellData.type=='name' ? "30%" : ''}>
        { this.props.cellData.type==="tax" && this.props.cellData.id[0] !=='S' ?
        <input type='number' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} className="form-control form-control1" readOnly/>
        :
          this.props.cellData.type==="name" ?
        <input type='text'  name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} className="form-control form-control1" />
          :
          this.props.cellData.type==="amount"  ?
        <input type='number' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}  className="form-control form-control1" readOnly/>
          :
        <input type='number'  name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}  className="form-control form-control1"/>
        }
      </td>
    );

  }

}
