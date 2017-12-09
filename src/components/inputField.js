import React, { Component } from 'react';

class Inputfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textFieldValue : "",
    }

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldValueChange(event) {
    if (this.props.gameProcess === 0) {
      this.setState({textFieldValue: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();    
    this.props.onSubmit(this.state.textFieldValue);
    this.setState({textFieldValue: ""});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Write something:  
          <input
            type="text"
            value={this.state.textFieldValue}            
            onChange={this.handleFieldValueChange}
            placeholder="aaanything"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Inputfield;