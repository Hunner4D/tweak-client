import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Header, Icon } from "semantic-ui-react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchMultipleStreams, deleteStream } from "../../actions/streams";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchMultipleStreams();
  }

  renderStreams() {
    if (
      this.props.streams &&
      Array.isArray(this.props.streams) &&
      !this.props.streams.includes(null) &&
      this.props.streams.length
    ) {
      return (
        <Card.Group itemsPerRow={4}>
          {this.props.streams.map((stream, idx) => {
            return (
              <Card key={idx}>
                <Card.Content>
                  <Link
                    to={{
                      pathname: `/streams/show/${_.truncate(stream.uuid, {
                        length: 8,
                        omission: "",
                      })}`,
                      state: stream,
                    }}
                    style={{
                      color: "black",
                      fontWeight: 700,
                      fontSize: "1.28571429em",
                      marginTop: "-.21425em",
                      lineHeight: "1.28571429em",
                    }}
                  >
                    <Card.Header>{stream.title}</Card.Header>
                  </Link>
                  <Card.Description>{stream.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>Hosted by {stream.owner}</Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      );
    } else {
      return <span>No Streams Found</span>;
    }
  }

  render() {
    return (
      <>
        <div></div>
        {this.renderStreams()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.streams,
    userInstance: state.auth.userInstance,
  };
};

export default connect(mapStateToProps, { fetchMultipleStreams, deleteStream })(
  StreamList
);
