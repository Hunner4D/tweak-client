import React, { useState } from "react";
import {
  Grid,
  Segment,
  Feed,
  Image,
  Input,
  Modal,
  Button,
  Header,
  Icon,
  Popup,
} from "semantic-ui-react";
import copy from "copy-to-clipboard";
import { connect } from "react-redux";
import { editStream } from "../../actions/streams";
import { changePath } from "../../actions/header";

const StreamEdit = (props) => {
  const [formData, setFormData] = useState({
    title: props.location.state.title,
    description: props.location.state.description,
    modalOpen: false,
    copyPopUp: false,
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

  const handleCopyOpen = () => {
    setFormData({ ...formData, copyPopUp: true });

    setTimeout(() => {
      setFormData({ copyPopUp: false });
    }, 2000);
  };

  const handleCopyClose = () => {
    setFormData({ ...formData, copyPopUp: false });
  };

  const renderEditPopUp = () => {
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

  const renderStartStream = () => {
    return (
      <Modal trigger={<Button fluid>Start Stream with Stream Key</Button>}>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            floated={"right"}
            rounded
            src={props.profileImage}
          />
          <Modal.Description>
            <Header>You're all set!</Header>
            <p>Use the following key to connect to your stream: </p>{" "}
            <Popup
              trigger={
                <Button
                  icon
                  labelPosition="right"
                  onClick={(e) => {
                    copy(props.location.state.stream_key);
                  }}
                >
                  Stream Key
                  <Icon name="copy" />
                </Button>
              }
              content="Copied to Clipboard!"
              on="click"
              open={formData.copyPopUp}
              onClose={handleCopyClose}
              onOpen={handleCopyOpen}
              position="bottom right"
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  };

  // const renderFeed = () => {
  //   return (
  //     <Container textAlign="center">
  //       <Feed>
  //         <Feed.Event>
  //           <Feed.Label>
  //             <img src="/images/avatar/small/elliot.jpg" />
  //           </Feed.Label>
  //           <Feed.Content>
  //             <Feed.Summary>
  //               <Feed.User>Elliot Fu</Feed.User> this stream fucking sucks
  //               <Feed.Date>1 Hour Ago</Feed.Date>
  //             </Feed.Summary>
  //             {/* <Feed.Meta>
  //             <Feed.Like>
  //               <Icon name="like" />4 Likes
  //             </Feed.Like>
  //           </Feed.Meta> */}
  //           </Feed.Content>
  //         </Feed.Event>
  //       </Feed>
  //     </Container>
  //   );
  // };

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
            <Segment size="massive"></Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment></Segment>
            <Segment></Segment>
            <Segment></Segment>
            <Segment></Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div>{renderEditPopUp()}</div>
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column width={2}>
            <div></div>
          </Grid.Column>
          <Grid.Column width={12}>{renderStartStream()}</Grid.Column>
          <Grid.Column width={2}>
            <div></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <p>
        You can use{" "}
        <a target="_blank" href="https://obsproject.com/">
          OBS
        </a>{" "}
        or
        <a target="_blank" href="https://www.xsplit.com/">
          XSplit
        </a>{" "}
        to Live stream. If you're using OBS, go to Settings > Stream and select
        Custom from service dropdown. Enter <b>rtmp://localhost/live</b> in
        server input field. Also, add your stream key for a given stream found
        in "My Streams".
      </p>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userInstance: state.auth.userInstance,
    profileImage: state.auth.profileImage,
  };
};

export default connect(mapStateToProps, { editStream, changePath })(StreamEdit);
