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
      changeicon:true,
      search:'',
    }
  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("shop");
    let shops = ShopApi.find({}).fetch();
    this.setState({shops});
  });
}
changeIcon(){
  this.setState({changeicon:!this.state.changeicon})
}
componentWillUnmount() {
this.linktracker.stop();
}
handleSearch(event){
  this.setState({search:event.target.value});
}

  render() {
    let searchshps = this.state.shops.filter((shop)=>{
      return(shop.sname.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1)
    })
    return (
      <div>
      <Header name="Shopbook" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">

          <div className="mainlayout-search">
            <div className="search-container">
              <div className="search-one">
                <div className="searchrow">
                  <div className="searchgroup">
                      <input type="search" placeholder="Search Your Local Shops By Name..." id="pac-input3" value={this.state.search} onChange={this.handleSearch.bind(this)} onBlur={this.changeIcon.bind(this)} onFocus={this.changeIcon.bind(this)}/>
                  </div>
                  {
                    this.state.changeicon ? <i className="material-icons" >search</i> :<i className="material-icons close-btn" onClick={this.changeIcon.bind(this)}>close</i>
                  }
                </div>
              </div>
            </div>
          </div>

          <h3 className="myhomeTitle">Welcome to the Shop Book Here You Can Direclty Connect With Your Near Local Shop's, Retail Store's and Business</h3>

          <div className="card">
            {
              searchshps.map((product,i)=>{
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
