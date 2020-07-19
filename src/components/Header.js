import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Menu, Input } from "semantic-ui-react";

class Header extends React.Component {
  state = { activeItem: "home" };

  componentDidMount() {
    const guide = { "/": "home" };
    let current = this.props.history.location.pathname;
    console.log(guide[current]);
    this.setState({ activeItem: guide[current] });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

    switch (name) {
      case "home":
        this.props.history.push("/");
    }
  };

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

export default Header;
