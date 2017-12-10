import React, { Component } from 'react';
import './inputField.css';

class Inputfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textFieldValue : '',
    }

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldValueChange(event) {
    this.setState({textFieldValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();    
    this.props.onSubmit(this.state.textFieldValue);
    this.setState({textFieldValue: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className="input-description">
          Write me something and let the yackering ensue!
        </p>
            <input id="text-input"
              type="text"
              value={this.state.textFieldValue}            
              onChange={this.handleFieldValueChange}
              placeholder="type here"
            />
           <input id="submit-button" type="submit" value="Say it" />
       
      </form>
    );
  }
}

export default Inputfield;