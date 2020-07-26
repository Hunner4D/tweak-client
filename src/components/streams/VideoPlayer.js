import React from "react";
import server from "../../apis/server";
import flv from "flv.js";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }
  state = {url: null}

  componentDidMount() {
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.uuid) {
      return;
    }

    server.get(`/rtmp/${this.props.uuid}`).then((res) => {
      if (res.data) {
        this.player = flv.createPlayer({
          type: "flv",
          url: res.data,
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
      }
    });
  }

  render() {
    if (!this.props.uuid) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <video
          ref={this.videoRef}
          style={{ width: "100%", marginTop: "42px" }}
          controls
        />
      </div>
    );
  }
}

export default VideoPlayer;
