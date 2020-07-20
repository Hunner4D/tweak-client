import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Menu, Input } from "semantic-ui-react";

import { connect } from "react-redux";

class Header extends React.Component {
  state = { activeItem: "home" };

  componentDidMount() {
    const guide = { "/": "home" };
    let current = this.props.history.location.pathname;
    this.setState({ activeItem: guide[current] });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

    switch (name) {
      case "home":
        this.props.history.push("/");
        break;
      case "create stream":
        this.props.history.push("/streams/new");
        break;
      default:
        break;
    }
  };

  renderCreate(activeItem) {
    if (this.props.isSignedIn) {
      return (
        <Menu.Item
        name="create stream"
        active={activeItem === "create stream"}
        onClick={this.handleItemClick}
      />
      );
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="messages"
            active={activeItem === "messages"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="friends"
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          />
          {this.renderCreate(activeItem)}
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <GoogleAuth />
          </Menu.Menu>
        </Menu>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps)(Header);
