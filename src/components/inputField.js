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
        <p id="input-description">
          Write me something and let the yackering ensue!
        </p>
          <div id="text-and-submit">
            <input id="text-input"
              type="text"
              autoFocus
              value={this.state.textFieldValue}            
              onChange={this.handleFieldValueChange}
              placeholder="type here"
            />
           <input id="submit-button" type="submit" value="Say it" />
          </div>
      </form>
    );
  }
}

export default Inputfield;