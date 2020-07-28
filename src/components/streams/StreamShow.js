import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import LiveChat from "./LiveChat";

const StreamShow = (props) => {
  return (
    <>
      <Grid columns={3} divided="vertically">
        <Grid.Row stretched>
          <Grid.Column>
            <Segment size="massive">
              {props.location.state.title}
              <br />
              <br />
              <br />
              <br />
            </Segment>
            <Segment size="big">{props.location.state.description}</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment size="massive">
              <VideoPlayer uuid={props.location.state.uuid} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
            <Segment>3</Segment>
            <Segment>4</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {/*  */}
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column width={2}>
            <div></div>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <LiveChat pathname={props.location.pathname}/>
            </Segment>
          </Grid.Column>
          <Grid.Column width={2}>
            <div></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {/* <VideoPlayer uuid={props.location.state.uuid}/> */}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, ownProps };
};

export default connect(mapStateToProps)(StreamShow);
