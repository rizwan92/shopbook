import React, { Component } from 'react';

class AddProperty extends Component {
constructor(props) {
  super(props);
  this.state = {
    name:'',
  };
}
setValue(field, event) {
 let object = {};
 object[field] = event.target.value;
 this.setState(object);
}
handleRSubmit(event) {
  event.preventDefault();
  const name = this.state.name.trim();
  const subcatid = this.props.subcatid
  Meteor.call('property.insert',name,subcatid,(err,res)=>{
    if (res) {
      Bert.alert( 'Property Added', 'success', 'growl-top-right' );
      this.setState({name:''})
      this.props.closeModal()
    }
  })
}
  render() {
    return (
      <div>
      <div className="addproduct-container">
        <h2>Add Sub Category</h2>
        <form onSubmit={this.handleRSubmit.bind(this)}>
        <div>
        <label htmlFor="username" className="input-label">Name</label>
        <input type="text" className="input" placeholder="" required value={this.state.name}  onChange={this.setValue.bind(this, 'name')} />

        </div>
        <div style={{marginTop:'auto'}}>
          <button className="submit sign-up-submit" type="submit">Submit</button>
        </div>
        </form>
      </div>

      </div>
    );
  }

}

export default AddProperty;
