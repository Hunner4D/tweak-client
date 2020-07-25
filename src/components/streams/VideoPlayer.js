import React from "react";
import server from "../../apis/server";
import Hls from "hls.js";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.hls = new Hls();
  }

  componentDidMount() {
    server.get(`/rtmp/${this.props.uuid}`).then((res) => {
      const video = this.player;
      const src = res.data;

      // if (Hls.isSupported()) {
      //   this.hls.loadSource(src);
      //   this.hls.attachMedia(video);
      //   this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //     video.play();
      //   });
      // } else {
      //   console.log(
      //     "Our streaming services is unfornately not available on youre browser."
      //   );
      // }
    });
  }

  render() {
    return (
      <>
        {/* <video
          className="videoCanvas"
          ref={(player) => (this.player = player)}
          autoPlay={true}
        /> */}
      </>
    );
  }
}

export default VideoPlayer;
