import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class PlayerRender extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log("player render: GamePROCESS: " + this.props.gameProcess);
    var playerToRender = {};
    if (this.props.gameProcess == 2) {
      playerToRender = <ReactPlayer url='https://www.youtube.com/watch?v=4uEnNSclcqIh' playing={true} />;
    }
    else if (this.props.gameProcess == 0) playerToRender = null;
    else if (this.props.gameProcess == 1) playerToRender = null;
    return (
      <div>
      {playerToRender}
      </div>
    );
  }
}

export default PlayerRender;