import React, { useState } from "react";
import {
  Grid,
  Segment,
  Feed,
  Container,
  Input,
  Modal,
  Button,
  Header,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { editStream } from "../../actions/streams";
import { changePath } from "../../actions/header";

const StreamEdit = (props) => {
  const [formData, setFormData] = useState({
    title: props.location.state.title,
    description: props.location.state.description,
    modalOpen: false,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const triggerConfirm = (event) => {
    event.preventDefault();
    setFormData({ ...formData, modalOpen: true });
  };

  const handleSubmit = async () => {
    let query = {
      idToken: props.token,
      userInstance: props.userInstance,
      streamId: props.location.state.uuid,
      formInfo: {
        title: formData.title,
        description: formData.description,
      },
    };
    await props.editStream(query);
    props.changePath("/streams/owned");
    props.history.push("/streams/owned");
  };

  const renderPopUp = () => {
    return (
      <Modal
        basic
        size="small"
        open={formData.modalOpen}
        onClose={() => setFormData({ ...formData, modalOpen: false })}
      >
        <Header icon="write" content="Done Editing?" />
        <Modal.Content>
          <p>
            Are you sure you would like to finish edits for {formData.title}?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setFormData({ ...formData, modalOpen: false })}
          >
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

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
            <form onSubmit={triggerConfirm}>
              <Segment size="massive">
                <Input
                  type="text"
                  icon="edit"
                  transparent
                  name="title"
                  placeholder={formData.title}
                  value={formData.title}
                  onChange={handleChange}
                />
                <br />
                <br />
                <br />
                <br />
              </Segment>
              <Segment size="big">
                <Input
                  type="text"
                  icon="edit"
                  transparent
                  name="description"
                  placeholder={formData.description}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Segment>
              <button type="submit"></button>
            </form>
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
      <div>{renderPopUp()}</div>
      {/*  */}
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column width={2}>
            <div></div>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>{renderFeed()}</Segment>
            <Segment>{props.location.state.stream_key}</Segment>
          </Grid.Column>
          <Grid.Column width={2}>
            <div></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return { token: state.auth.token, userInstance: state.auth.userInstance };
};

export default connect(mapStateToProps, { editStream, changePath })(StreamEdit);
