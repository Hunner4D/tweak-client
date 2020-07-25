import React from "react";
import videojs from "video.js";
import { HlsSourceHandler } from 'videojs-contrib-hls';
import server from "../../apis/server";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: false,
    };
  }

  componentDidMount() {
    server.get(`/rtmp/${this.props.uuid}`).then((res) => {
      console.log(res.data);
      this.setState({ stream: true });
      videojs.getTech('html5').registerSourceHandler(HlsSourceHandler('html5'), 0);
      
      this.player = videojs(this.videoNode, res.data, function onPlayerReady() {
        console.log("onPlayerReady", this);
      });
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <>
        {this.state.stream ? (
          <div>
            <div data-vjs-player>
              <video
                ref={(node) => (this.videoNode = node)}
                className="video-js vjs-big-play-centered"
              ></video>
            </div>
          </div>
        ) : (
          <span>" Loading ... "</span>
        )}
      </>
    );
  }
}

export default VideoPlayer;
