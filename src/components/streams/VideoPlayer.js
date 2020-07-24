import React from "react";
import videojs from "video.js";
import server from "../../apis/server";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: false,
    };
  }

  componentDidMount() {
    server
      .get(`/rtmp/${this.props.uuid}`)
      .then((res) => {
        console.log(res.data);
        // this.setState({ stream: true });
        this.player = videojs(
          this.videoNode,
          res.data,
          function onPlayerReady() {
            console.log("onPlayerReady", this);
          }
        );
      })
      .then(() => {
        this.setState({ stream: true });
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
          <div data-vjs-player>
            <video
              ref={(node) => (this.videoNode = node)}
              className="video-js vjs-big-play-centered"
            />
          </div>
        ) : (
          " Loading ... "
        )}
      </>
    );
  }
}

export default VideoPlayer;
