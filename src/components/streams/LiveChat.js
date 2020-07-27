import React from "react";
import { Feed, Container } from "semantic-ui-react";
import { connect } from "react-redux";


const LiveChat = (props) => {
  return (
    <Container textAlign="center">
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src="/images/avatar/small/elliot.jpg" alt="avatar" />
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

const mapStateToProps = (state) => {
  return { username: state.auth.username, profileImage: state.auth.profileImage };
};

export default connect(mapStateToProps)(LiveChat);
