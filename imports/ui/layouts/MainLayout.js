import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/header/Header';
import Search from '../components/Search';
import ShopCard from '../components/ShopCard';
import {ShopApi} from '../../api/shop';

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops:[],
    }
  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("shop");
    let shops = ShopApi.find({}).fetch();
    this.setState({shops});
  });
}
componentWillUnmount() {
this.linktracker.stop();
}

  render() {
    return (
      <div>
      <Header name="SocialShop" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">

          <div className="mainlayout-search">
            <Search />
          </div>

          <div className="card">
            {
              this.state.shops.map((product,i)=>{
                return(
                  <NavLink key={i} to={`/shop/${product._id}`}>
                  <ShopCard   product={product} isAdmin={false}/>
                  </NavLink>
                )
              })
            }
          </div>

          </div>
          <div className="mainlayoutthree"></div>
        </div>
      </div>
    )
  }
}
