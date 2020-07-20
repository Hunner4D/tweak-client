import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Header, Icon } from "semantic-ui-react";
import _ from "lodash";

import { connect } from "react-redux";
import { fetchMultipleStreams, deleteStream } from "../../actions/streams";

class StreamList extends React.Component {
  state = { modalOpen: false, modalNum: null };

  componentDidMount() {
    this.props.fetchMultipleStreams();
  }

  handleOpen = (idx) => this.setState({ modalOpen: true, modalNum: idx });
  handleClose = (idx) => this.setState({ modalOpen: false, modalNum: null });

  ifStreamOwner(stream, idx) {
    if (stream.userId === this.props.userId) {
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
                Edit Stream
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
                      userId: this.props.userId,
                      userInstance: this.props.userInstance,
                      streamId: stream.uuid
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
  }

  renderStreams() {
    if (this.props.streams && Array.isArray(this.props.streams)) {
      return (
        <Card.Group itemsPerRow={4}>
          {this.props.streams.map((stream, idx) => {
            return (
              <Card key={idx}>
                <Card.Content>
                  <Card.Header>{stream.title}</Card.Header>
                  <Card.Description>{stream.description}</Card.Description>
                </Card.Content>

                {this.ifStreamOwner(stream, idx)}
              </Card>
            );
          })}
        </Card.Group>
      );
    } else {
      return <span>no streams found</span>;
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
    userId: state.auth.userId,
    userInstance: state.auth.userInstance,
  };
};

export default connect(mapStateToProps, { fetchMultipleStreams, deleteStream })(
  StreamList
);
