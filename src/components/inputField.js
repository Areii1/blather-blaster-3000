import React, { Component } from 'react';

class Inputfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textFieldValue : "",
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
  }

  handleFieldValueChange(event) {
    this.setState({textFieldValue: event.target.value});
    if (event.key === 'Enter') {
      this.props.transable(this.state.textFieldValue);
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleFieldValueChange}
          onKeyPress={this.handleFieldValueChange}
          placeholder="tell me something"
          value={this.state.textFieldValue}
          />
      </div>
    );
  }
}

export default Inputfield;