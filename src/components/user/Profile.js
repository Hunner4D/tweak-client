import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Grid, Image, Header, Button, Container } from "semantic-ui-react";

import { connect } from "react-redux";

const Profile = (props) => {
  return (
    <>
      <Grid celled={false}>
        <Grid.Row>
          <Grid.Column width={3}>
            {/* <Image src="/images/wireframe/centered-paragraph.png" /> */}
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h2" icon textAlign="center">
              <Image centered circular src={props.auth.profileImage} />
              <br />
              <br />
              <Header.Content>{props.auth.username}</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            {/* <Image src="/images/wireframe/image.png" /> */}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            {/* <Image src="/images/wireframe/image.png" /> */}
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h3" textAlign="center">
              {props.auth.category === "Streamer" ? props.auth.category : `A ${props.auth.category} Channel`}
            </Header>
            <br />
          </Grid.Column>
          <Grid.Column width={3}>
            {/* <Image src="/images/wireframe/image.png" /> */}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            {/* <Image src="/images/wireframe/image.png" /> */}
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h4" textAlign="center">
              About Me:
            </Header>
            <Container text textAlign="center">
              <p>{props.auth.about}</p>
            </Container>
          </Grid.Column>
          <Grid.Column width={3}>
            {/* <Image src="/images/wireframe/image.png" /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />
      <br />
      <br />
      <Link
        to={{
          pathname: `/profile/edit/${_.truncate(props.auth.userInstance, {
            length: 8,
            omission: "",
          })}`,
          state: props.auth,
        }}
      >
        <Button fluid>Edit Profile</Button>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Profile);

//   <div>Profile Page</div>
