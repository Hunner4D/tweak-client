import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import _ from "lodash";

import { connect } from "react-redux";
import { fetchMultipleStreams } from "../../actions/streams";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchMultipleStreams();
  }

  ifStreamOwner(stream) {
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
              >
                Edit Stream
              </Link>
            </Button>
            <Button basic color="red">
              <Link
                to={{
                  pathname: `/streams/delete/${_.truncate(stream.uuid, {
                    length: 8,
                    omission: "",
                  })}`,
                  state: stream,
                }}
              >
                Delete
              </Link>
            </Button>
          </div>
        </Card.Content>
      );
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return <Link to="/streams/new">Create Stream</Link>;
    }
  }

  renderStreams() {
    if (this.props.streams) {
      return (
        <Card.Group itemsPerRow={4}>
          {this.props.streams.map((stream, idx) => {
            return (
              <Card key={idx}>
                <Card.Content>
                  <Card.Header>{stream.title}</Card.Header>
                  <Card.Description>{stream.description}</Card.Description>
                </Card.Content>

                {this.ifStreamOwner(stream)}
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
        {this.renderCreate()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.streams,
    userId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchMultipleStreams })(StreamList);
