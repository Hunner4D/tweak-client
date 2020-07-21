import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Menu, Input } from "semantic-ui-react";

import { connect } from "react-redux";

class Header extends React.Component {
  state = { activeItem: "streams" };

  componentDidMount() {
    const guide = { "/": "streams" };
    let current = this.props.history.location.pathname;
    if (guide[current]) {
      this.setState({ activeItem: guide[current] });
    } else {
      this.setState({ activeItem: null });
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

    switch (name) {
      case "streams":
        this.props.history.push("/");
        break;
      case "create stream":
        this.props.history.push("/streams/new");
        break;
      case "my streams":
        this.props.history.push("/streams/owned");
        break;
      default:
        break;
    }
  };

  renderIfSignedIn(activeItem) {
    if (this.props.isSignedIn) {
      return (
        <>
          <Menu.Item
            name="my streams"
            active={activeItem === "my streams"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="create stream"
            active={activeItem === "create stream"}
            onClick={this.handleItemClick}
          />
        </>
      );
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="streams"
            active={activeItem === "streams"}
            onClick={this.handleItemClick}
          />
          {this.renderIfSignedIn(activeItem)}
          <Menu.Item
            name="about"
            active={activeItem === "about"}
            onClick={this.handleItemClick}
          />
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
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Header);
