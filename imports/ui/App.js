import React, { Component } from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';
import { Session } from 'meteor/session';
import  MainLayout  from './layouts/MainLayout';
import  NearByLayout  from './layouts/NearByLayout';
import  AdminLayout  from './layouts/AdminLayout';
import  LoginLayout  from './layouts/LoginLayout';
import  LinksLayout  from './layouts/LinksLayout';
import  BillBookLayout  from './layouts/BillBookLayout';
import  ProductLayout  from './layouts/ProductLayout';
import  ProductDetail  from './components/ProductDetail';
import  ShopShow  from './components/ShopShow';
import  ProductEdit  from './components/ProductEdit';
import  EditProfile  from './components/EditProfile';
import  LinkUpdate  from './components/LinkUpdate';
import  Practice  from './components/Practice';
import  StatePlace  from './components/StatePlace';
import CategoryPage from './pages/CategoryPage';
import EditProductPage from './pages/EditProductPage';
export default class App extends Component {

  authentication(props) {
  return (
    Session.get('shop') ?
     <AdminLayout />
     :
      <Redirect to={{  pathname: '/login',  state: {  from: props.location  }  }}/>
    )
}
authenticationBillbook(props) {
return (
  Session.get('shop') ?
   <BillBookLayout />
   :
    <Redirect to={{  pathname: '/login',  state: {  from: props.location  }  }}/>
  )
}

  render(){
   return (
     <div>
      <Switch>
            <Route exact path="/" component={MainLayout} />
            <Route exact path="/nearby" component={NearByLayout} />
            <Route exact path="/myshop"  render={this.authentication.bind(this)} />
            <Route exact path="/login" component={LoginLayout} />
            <Route exact path="/product" component={ProductLayout} />
            <Route exact path="/billbook" render={this.authenticationBillbook.bind(this)} />
            <Route exact path="/billbook/productmaster" component={BillBookLayout}/>
            <Route exact path="/billbook/invoice" component={BillBookLayout}/>
            <Route exact path="/billbook/invoice/:id" component={BillBookLayout}/>
            <Route exact path="/billbook/purchase" component={BillBookLayout}/>
            <Route exact path="/billbook/purchase/:id" component={BillBookLayout}/>
            <Route exact path="/billbook/qrcode" component={BillBookLayout}/>
            <Route exact path="/billbook/report" component={BillBookLayout}/>

            <Route exact path="/edit" component={EditProfile} />
            <Route exact path="/practice" component={Practice} />
            <Route exact path="/links" component={LinksLayout} />
            <Route exact path="/links/:id" component={LinkUpdate} />
            <Route exact path="/state" component={StatePlace} />
            <Route exact path="/product/:id" component={ProductDetail} />
            <Route exact path="/product/edit/:id" component={ProductEdit} />
            <Route exact path="/shop/:id" component={ShopShow} />

            <Route exact path="/category" component={CategoryPage} />
            <Route exact path="/category/:id" component={CategoryPage}/>
            <Route exact path="/category/subcategory/:id" component={CategoryPage}/>

            <Route exact path="/edit/product" component={EditProductPage}/>
            <Route exact path="/edit/product/:id" component={EditProductPage}/>
            <Route component={NoMatch}/>
        </Switch>
     </div>
   )
 }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
