import React, { Component } from 'react';
import Header from './header/Header';
import {Tracker} from 'meteor/tracker';
import {LinkApi} from '../../api/link';

export default class LinkUpdate  extends Component {
  constructor() {
    super();
    this.state= {
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

  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("linkbyid",this.props.match.params.id);
      let links = LinkApi.find({_id:this.props.match.params.id}).fetch();
      if (links[0]) {
        this.setState({
          name:links[0].name,
          category:links[0].category,
          description:links[0].description,
          length:links[0].length,
          rating:links[0].rating,
          quality:links[0].quality,
          sizein:links[0].sizein,
          size:links[0].size,
          imageLink:links[0].image,
          dlink:links[0].dlink,
        });
      }
    });
}
componentWillUnmount(){
this.linktracker.stop();
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
    if (dlink == '') {
      Bert.alert( 'Link is null', 'danger', 'growl-top-right' );
      return flase;
    }
    const link = {
      name,category,description,length,rating,quality,sizein,size,imageLink,dlink
    }

    Meteor.call('link.update',this.props.match.params.id,link,(error,result)=>{
      if (result) {
        Bert.alert( 'Successfully updated', 'success', 'growl-top-right' );
      }
     })

  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 hableImagecondition(){
   this.setState({condition:!this.state.condition})
 }

  render(){
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
                <h2>Update {this.state.name}</h2>
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
