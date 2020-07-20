import React from "react";
import { Grid, Segment, Feed, Container } from "semantic-ui-react";
import { connect } from "react-redux";

const StreamEdit = (props) => {
  const renderFeed = () => {
    return (
      <Container textAlign="center">
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <img src="/images/avatar/small/elliot.jpg" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>Elliot Fu</Feed.User> this stream fucking sucks
                <Feed.Date>1 Hour Ago</Feed.Date>
              </Feed.Summary>
              {/* <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />4 Likes
              </Feed.Like>
            </Feed.Meta> */}
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Container>
    );
  };

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
            <Segment size="massive">1</Segment>
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
            <Segment>{renderFeed()}</Segment>
          </Grid.Column>
          <Grid.Column width={2}>
            <div></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, ownProps };
};

export default connect(mapStateToProps)(StreamEdit);
