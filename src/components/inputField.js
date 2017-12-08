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
      this.props.onSubmit(this.state.textFieldValue);
      this.setState({textFieldValue: ""});
    }
  }

  render() {
    return (
      <div>
        <h3>Write something something funny</h3>
        <input
          type="text"
          onChange={this.handleFieldValueChange}
          onKeyPress={this.handleFieldValueChange}
          placeholder="aaanything"
          value={this.state.textFieldValue}
          />
      </div>
    );
  }
}

export default Inputfield;