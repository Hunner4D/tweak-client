import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Menu, Input } from "semantic-ui-react";

import { changePath } from "../actions/header";
import { connect } from "react-redux";

class Header extends React.Component {

  handleItemClick = (e, { name }) => {
    switch (name) {
      case "streams":
        this.props.changePath("/");
        this.props.history.push("/");
        break;
      case "create stream":
        this.props.changePath("/streams/new");
        this.props.history.push("/streams/new");
        break;
      case "my streams":
        this.props.changePath("/streams/owned");
        this.props.history.push("/streams/owned");
        break;
      case "profile":
        this.props.changePath("/profile/edit");
        this.props.history.push("/profile/edit");
        break;
      default:
        break;
    }
  };

  renderIfSignedInLeft() {
    if (this.props.isSignedIn) {
      return (
        <>
          <Menu.Item
            name="my streams"
            active={this.props.activeItem === "my streams"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="create stream"
            active={this.props.activeItem === "create stream"}
            onClick={this.handleItemClick}
          />
        </>
      );
    }
  }

  renderIfSignedInRight() {
    if (this.props.isSignedIn) {
      return (
        <>
          <Menu.Item
            name="profile"
            active={this.props.activeItem === "profile"}
            onClick={this.handleItemClick}
          />
        </>
      );
    }
  }

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="streams"
            active={this.props.activeItem === "streams"}
            onClick={this.handleItemClick}
          />
          {this.renderIfSignedInLeft()}
          <Menu.Item
            name="about"
            active={this.props.activeItem === "about"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            {this.renderIfSignedInRight()}
            <GoogleAuth />
          </Menu.Menu>
        </Menu>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    activeItem: state.header.activeItem,
  };
};

export default connect(mapStateToProps, { changePath })(Header);
