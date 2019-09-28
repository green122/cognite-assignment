import React, { useEffect, useContext, useCallback } from "react";
import UsersList from "../../components/UserList/UserList";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import ChatInput from "../../components/ChatInput/ChatInput";
import { getChatMessages, sendMessage } from "../../utils/fakeApi";
import "./messenger.css";

import {
  GET_MESSAGES,
  SELECT_CHAT_USER,
  SEND_MESSAGE,
  StateContext,  
  getUserById
} from "../../App";

export function makeMessage({ content, from, to }) {
  return {
    content,
    from,
    to,
    timestamp: Date.now()
  };
}

export default function Messager() {
  const { dispatch, state } = useContext(StateContext);
  const { loggedUser, chatUser, messages } = state;
  const userList = state.userList.filter(({ id }) => id !== loggedUser);

  useEffect(() => {
    getChatMessages({ from: loggedUser, to: chatUser }).then(chatMessages => {
      dispatch({ type: GET_MESSAGES, payload: chatMessages });
    });
  }, [dispatch, loggedUser, chatUser]);

  const onEnter = useCallback(
    content => {
      const message = makeMessage({ content, from: loggedUser, to: chatUser });
      sendMessage({ from: loggedUser, message }).then(() =>
        dispatch({ type: SEND_MESSAGE, payload: message })
      );
    },
    [dispatch, loggedUser, chatUser]
  );

  return (
    <div className="messenger">
      <UsersList actionType={SELECT_CHAT_USER} userList={userList} />
      {chatUser ? (
        <section className="chat-container">
            <div className="chat-user">
                Conversation with {getUserById(userList, chatUser).name}
            </div>
          <div className="messages">
            {messages
              .slice()
              .reverse()
              .map(message => (
                <ChatMessage
                  message={message.content}
                  className={message.from === loggedUser ? "author" : "sender"}
                />
              ))}
          </div>
          <ChatInput onEnter={onEnter} />
        </section>
      ) : (
        <div className="warning"> Please select user to chat with... </div>
      )}
    </div>
  );
}
