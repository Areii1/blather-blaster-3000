import React, { Component } from 'react';
import Sound from 'react-sound';

class ConclusionMessage extends Component {
  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div>
        <h3>{this.props.label}</h3>
        <Sound
          url="../noyryytys.mp3"
          playStatus={Sound.status.PLAYING}
          playFromPosition={300 /* in milliseconds */}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      );
    }
          />
      </div>
    );
  }
}

export default ConclusionMessage;