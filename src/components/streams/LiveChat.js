import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Feed, Container, Input } from "semantic-ui-react";
import { connect } from "react-redux";

const socket = io(process.env.REACT_APP_CHAT_SOCKET, {
  transports: ["websocket", "polling"],
});

const LiveChat = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const idSplit = props.pathname.split("/");
  const chatId = idSplit[idSplit.length - 1];

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("userConnect", chatId);
    });
  })

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message)
      setMessages([...messages, message]);
    });
  })

  const submit = (event) => {
    event.preventDefault();
    console.log("submitted: ", message, "recieved: ", messages);
    socket.emit("send", {
      message,
      chatId,
      username: props.username,
      profileImage: props.profileImage,
    });
    setMessage("");
  };

  return (
    <Container textAlign="center">
      <Feed>
        {messages.map(({ image, user, text, date }, index) => (
          <Feed.Event key={index}>
            <Feed.Label>
              <img src={image} alt="avatar" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{user}</Feed.User>
                {`               ${text}`}
                <Feed.Date>{date}</Feed.Date>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        ))}
      </Feed>
      <form onSubmit={submit}>
        <Input
          focus
          fluid
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    profileImage: state.auth.profileImage,
  };
};

export default connect(mapStateToProps)(LiveChat);
