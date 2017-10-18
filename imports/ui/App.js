import React, { Component } from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';
import { Session } from 'meteor/session';
import  MainLayout  from './layouts/MainLayout';
import  NearByLayout  from './layouts/NearByLayout';
import  AdminLayout  from './layouts/AdminLayout';
import  LoginLayout  from './layouts/LoginLayout';
import  ProductDetail  from './components/ProductDetail';
import  ShopShow  from './components/ShopShow';
import  EditProfile  from './components/EditProfile';
import  Practice  from './components/Practice';
import  StatePlace  from './components/StatePlace';
export default class App extends Component {

  authentication(props) {
  return (
    Session.get('shop') ?
     <AdminLayout />
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
            <Route  path="/myshop"  render={this.authentication.bind(this)} />
            <Route  path="/login" component={LoginLayout} />
            <Route  path="/edit" component={EditProfile} />
            <Route  path="/practice" component={Practice} />
            <Route  path="/state" component={StatePlace} />
            <Route  path="/product/:id" component={ProductDetail} />
            <Route  path="/shop/:id" component={ShopShow} />
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
