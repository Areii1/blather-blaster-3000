import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Inputfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textFieldValue : "",
      textFieldValueSubmitted: ""
    }

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleFieldValueChange(event) {
    this.setState({textFieldValue: event.target.value});

    if (event.key === 'Enter') {
      console.log("enter was pressed");
      this.state.textFieldValueSubmitted = this.state.textFieldValue;
      console.log(this.state.textFieldValueSubmitted);
    }
  }

  submit(event) {

  }


  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleFieldValueChange}
          onKeyPress={this.handleFieldValueChange}
          placeholder="kirjota ny jotai"
          value={this.state.textFieldValue}
          />
        <p>{this.state.textFieldValueSubmitted} </p> 
      </div>
    );
  }

}


export default Inputfield;