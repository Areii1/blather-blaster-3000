import React, { Component } from 'react';

class Inputfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textFieldValue : ""
    }

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
  }

  handleFieldValueChange(event) {
    this.setState({textFieldValue: event.target.value});
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleFieldValueChange}
        placeholder="kirjota ny jotai"
        value={this.state.textFieldValue}
        />
    );
  }

}


export default Inputfield;