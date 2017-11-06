import React, { Component } from 'react';
import Header from '../components/header/Header';
import {Tracker} from 'meteor/tracker';
import {LinkApi} from '../../api/link';
import { NavLink,withRouter } from 'react-router-dom';
 class LinksLayout  extends Component {
  constructor() {
    super();
    this.state = {
      links:[],
      name:'',
      category:'',
      description:'',
      length:'',
      rating:'',
      quality:'',
      sizein:'',
      size:'',
      imageLink:'',
      dlink:'',
      search:'',
      condition:true,
    }
  }
  componentWillMount(){
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("link");
      let links = LinkApi.find().fetch();
      this.setState({links});
    });

  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
   handleRSubmit(event) {
     event.preventDefault();
     const name = this.state.name.trim();
     const category = this.state.category.trim();
     const description = this.state.description.trim();
     const length = this.state.length;
     const rating = this.state.rating;
     const quality = this.state.quality.trim();
     const sizein = this.state.sizein.trim();
     const size = this.state.size.trim();
     let imageLink = this.state.imageLink.trim();
     let dlink = this.state.dlink.trim();
     if (imageLink == '') {
       Bert.alert( 'Image is not set', 'danger', 'growl-top-right' );
       return flase;
     }

     const link = {
       name,category,description,length,rating,quality,sizein,size,imageLink,dlink
     }

     Meteor.call('link.insert',link,(error,result)=>{
       if (result) {
         Bert.alert( 'Successfully Entered', 'success', 'growl-top-right' );
       }
      })

  }

  initMap =() => {
    
  }
  componentDidMount(){
    window.initMap = this.initMap;
  }
  uploadWidget(event) {
  event.preventDefault();
  let setImagelinkState = (link)=> {
    this.setState({imageLink:link});
  }
  cloudinary.openUploadWidget({ cloud_name: 'dcr2pfgxy', upload_preset: 'kzkxno3w', tags:['xmas']},
      function(error, result) {
          setImagelinkState(result[0].secure_url);
      });
}
  hableImagecondition(){
    this.setState({condition:!this.state.condition})
  }
  productDelete(linkid){
    let result = confirm("Want to delete?");
  if (result) {
    Meteor.call('link.remove',linkid);
    }
  }
  render(){
    window.initMap = this.initMap;
    let searchlinks = this.state.links.filter((link)=>{
    return(link.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1)
    })

    return(
      <div>
      <Header name="Shopbook" isAdmin={false} />
        <div className="mainlayout-container">
          <div className="mainlayoutone"></div>
          <div className="mainlayouttwo">


          <div className="mainlayout-container">
            <div className="mainlayoutone"></div>
            <div className="mainlayouttwo">

            <div>
              <div className="addproduct-container">
                <h2>Movies</h2>
                <form onSubmit={this.handleRSubmit.bind(this)}>
                <div>

                <label htmlFor="username" className="input-label">Movie Name</label>
                <input type="text" className="input" placeholder="" required value={this.state.name}  onChange={this.setValue.bind(this, 'name')} />

                <label htmlFor="username" className="input-label">Select State</label>
                <select className="myselect"  value={this.state.category}  onChange={this.setValue.bind(this, 'category')} required>
                <option value="">Select category</option>
                <option value="Bollywood">Bollywood</option>
                <option value="Hollywood">Hollywood</option>
                <option value="TVShow">TVShow</option>
                </select>

                <label htmlFor="username" className="input-label">Description</label>
                <input type="text" className="input" placeholder="" id="pac-input1"  value={this.state.description}  onChange={this.setValue.bind(this, 'description')} />

                <label htmlFor="username" className="input-label">length</label>
                <input type="text" className="input" placeholder=""  value={this.state.length}  onChange={this.setValue.bind(this, 'length')}/>

                <label htmlFor="username" className="input-label">Rating</label>
                <input type="text" className="input" placeholder=""  value={this.state.rating}  onChange={this.setValue.bind(this, 'rating')}/>

                <label htmlFor="username" className="input-label">Quality</label>
                <input type="text" className="input" placeholder=""  value={this.state.quality}  onChange={this.setValue.bind(this, 'quality')}/>

                <label htmlFor="username" className="input-label">Size in</label>
                <select className="myselect"  value={this.state.sizein}  onChange={this.setValue.bind(this, 'sizein')} >
                <option value="">Select category</option>
                <option value="KB">KB</option>
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                </select>

                <label htmlFor="username" className="input-label">Size</label>
                <input type="text" className="input" placeholder=""  value={this.state.size}  onChange={this.setValue.bind(this, 'size')}/>

                <label htmlFor="username" className="input-label">Download Link</label>
                <input type="text" className="input" placeholder=""  value={this.state.dlink}  onChange={this.setValue.bind(this, 'dlink')}/>

                <input type="checkbox" onChange={this.hableImagecondition.bind(this)} />

                {
                  this.state.condition ?
                  <div>
                    <label htmlFor="username" className="input-label">imageLink</label>
                    <input type="text" className="input" placeholder=""  value={this.state.imageLink}  onChange={this.setValue.bind(this, 'imageLink')}/>
                  </div>
                  :
                  <button onClick={this.uploadWidget.bind(this)} className="mybutton">upload image</button>
                }

                </div>
                <div style={{marginTop:'auto'}}>
                  <button className="submit sign-up-submit" type="submit">Submit</button>
                </div>
                </form>
              </div>
            </div>

            <div style={{marginTop:50}}>
            <h2 htmlFor="username" className="input-label">Search</h2>
            <input type="text"  placeholder="Search movies"  value={this.state.search}  onChange={this.setValue.bind(this, 'search')}/>
            </div>


            {
              searchlinks.map((link,i)=>{
                return(
                  <div key={i} style={{display:'flex',flexFlow:'column'}}>
                  <i className="material-icons close-btn" style={{display:'flex',justifyContent:'flex-end',cursor:'pointer'}} onClick={this.productDelete.bind(this,link._id)}>close</i>
                  <div  style={{display:'flex',flex:1,padding:5,alignItems:'center',borderBottom:'groove'}} >
                    <div style={{width:120,height:120,borderRadius:'50%',borderStyle:'groove'}}>
                        <img src={link.image ==='' ? 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg' : link.image} style={{width:'100%',height:'100%',borderRadius:'50%'}} />
                    </div>
                    <div style={{display:'flex',flexFlow:'column',padding:5,alignItems:'center'}}>
                        <div style={{padding:0,margin:0,fontSize:15,color:'blue'}} ><NavLink to={`/links/${link._id}`} style={{color:link.dlink ? 'blue': 'red'}}>Name: {link.name}</NavLink></div>
                        <div style={{padding:0,margin:0}}>Category: {link.category}</div>
                        <div style={{padding:0,margin:0}}>Description: {link.descridivtion}</div>
                        <div style={{padding:0,margin:0}}>Length: {link.length}</div>
                        <div style={{padding:0,margin:0}}>Rating: {link.rating}</div>
                        <div style={{padding:0,margin:0}}>Quality: {link.quality}</div>
                        <div style={{padding:0,margin:0}}>Size: {link.size + ' '+ link.sizein}</div>
                        <div style={{padding:0,margin:0}}>Rating: {link.rating}</div>
                    </div>
                  </div>
                </div>
                )
              })
            }


            </div>
            <div className="mainlayoutthree"></div>
          </div>



          </div>
          <div className="mainlayoutthree"></div>
        </div>
      </div>
    );
  }
}
export default withRouter(LinksLayout);
