import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class PlayerRender extends Component {

  render() {
    console.log("player render: GamePROCESS: " + this.props.gameProcess + "player render: userAnsweredRight " + this.props.userAnsweredRight);
    var playerToRender = {};
    if (this.props.gameProcess === 2 && this.props.userAnsweredRight) {
      playerToRender = <ReactPlayer url='https://www.youtube.com/watch?v=cIDHFbjQ93A' playing={true} />;
    }
    else if (this.props.gameProcess === 2 && !this.props.userAnsweredRight) {
      playerToRender = <ReactPlayer url='https://www.youtube.com/watch?v=4uEnNSclcqIh' playing={true} />;
    }
    else if (this.props.gameProcess === 0) playerToRender = null;
    else if (this.props.gameProcess === 1) playerToRender = null;

    else playerToRender = <p>don't be clicking too much man, shit is so ANNOYING</p>
  
    return (
      <div>
      {playerToRender}
      </div>
    );
  }
}

export default PlayerRender;