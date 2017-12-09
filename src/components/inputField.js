import React, { Component } from 'react';

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
        <label>
          Write something and I will say it out loud in a random language 
          <div>
            <input
              type="text"
              value={this.state.textFieldValue}            
              onChange={this.handleFieldValueChange}
              placeholder="aaanything"
            />
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Inputfield;