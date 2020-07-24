import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Header, Icon } from "semantic-ui-react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchMyStreams, deleteStream } from "../../actions/streams";

class StreamList extends React.Component {
  state = { modalOpen: false, modalNum: null };

  componentDidMount() {
    let idToken = this.props.token;
    let userInstance = this.props.userInstance;
    this.props.fetchMyStreams(idToken, userInstance);
  }

  handleOpen = (idx) => this.setState({ modalOpen: true, modalNum: idx });
  handleClose = (idx) => this.setState({ modalOpen: false, modalNum: null });

  streamOwner(stream, idx) {
    return (
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            <Link
              to={{
                pathname: `/streams/edit/${_.truncate(stream.uuid, {
                  length: 8,
                  omission: "",
                })}`,
                state: stream,
              }}
              style={{ color: "green", opacity: "0.6" }}
            >
              Start / Edit Stream
            </Link>
          </Button>
          <Modal
            trigger={
              <Button basic color="red" onClick={() => this.handleOpen(idx)}>
                Delete
              </Button>
            }
            basic
            size="small"
            open={this.state.modalOpen && idx === this.state.modalNum}
            onClose={this.handleClose}
          >
            <Header icon="trash" content="Delete Stream" />
            <Modal.Content>
              <p>
                Are you sure you would like to delete stream {stream.title} ?
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color="red" inverted onClick={this.handleClose}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                inverted
                onClick={() => {
                  let query = {
                    idToken: this.props.token,
                    userInstance: this.props.userInstance,
                    streamId: stream.uuid,
                  };
                  this.props.deleteStream(query);
                  this.handleClose();
                }}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </Card.Content>
    );
  }

  renderStreams() {
    if (this.props.streams.length) {
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

                {this.streamOwner(stream, idx)}
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
    token: state.auth.token,
    userInstance: state.auth.userInstance,
    streams: state.streams,
  };
};

export default connect(mapStateToProps, { fetchMyStreams, deleteStream })(
  StreamList
);
