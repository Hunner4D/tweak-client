import React from "react";
import { Card, Icon, } from "semantic-ui-react";
import _ from "lodash";

import { connect } from "react-redux";
import { fetchMultipleStreams } from "../../actions/streams";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchMultipleStreams();
  }

  renderStreams() {
    if (this.props.streams) {
      return (
        <Card.Group itemsPerRow={4}>
          {this.props.streams.map((stream) => {
            return (
              <Card>
                <Card.Content>
                  <Card.Header>{stream.title}</Card.Header>
                  <Card.Description>{stream.description}</Card.Description>
                </Card.Content>
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
        <div>StreamList</div>
        {this.renderStreams()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { streams: state.streams };
};

export default connect(mapStateToProps, { fetchMultipleStreams })(StreamList);
