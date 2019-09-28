import React, { useReducer, createContext, Fragment, useEffect } from "react";
import logo from "./logo.svg";
import UserList from "./components/UserList/UserList";
import Messenger from "./containers/Messenger/Messenger";
import { connectToStore } from './utils/fakeApi';
import "./App.css";

export const SELECT_LOGGED_USER = "SELECT_LOGGED_USER";
export const SELECT_CHAT_USER = "SELECT_CHAT_USER";
export const GET_MESSAGES = "GET_MESSAGES";
export const SEND_MESSAGE = "SEND_MESSAGE";

const usersOnline = [
  { name: "Darth Vader", picture: "", id: "abc001" },
  { name: "Princess Leia", picture: "", id: "bbg005" },
  { name: "Chubakka", picture: "", id: "hgf434" },
  { name: "Jackie Chan", picture: "", id: "dfg034" }
];

export const initialState = {
  loggedUser: "",
  chatUser: "",
  userList: usersOnline,
  messages: []
};

export const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case SELECT_LOGGED_USER:
      return { ...state, loggedUser: payload, messages: []};
    case SELECT_CHAT_USER:
      return { ...state, chatUser: payload, messages: [] };
    case GET_MESSAGES:
      return { ...state, messages: payload };
    case SEND_MESSAGE:
      return { ...state, messages: state.messages.concat(payload) };
    default:
      return state;
  }
};

export const StateContext = createContext({
  state: initialState,
  dispatch: () => ({})
});

export function getUserById(userList, userId) {
  return userList.find(({ id }) => id === userId) || {};
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedUser, userList } = state;

  useEffect(() => {
    connectToStore();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Cognite interview boilerplate</h1>
      </header>
      <StateContext.Provider value={{ state, dispatch }}>
        {loggedUser ? (
          <Fragment>
            <button
              className="switch-button"
              onClick={() =>
                dispatch({ type: SELECT_LOGGED_USER, payload: "" })
              }
            >
              Switch from {getUserById(userList, loggedUser).name} to another
              user
            </button>
            <Messenger />
          </Fragment>
        ) : (
          <div className="user-selection">
            Select user:
            <UserList actionType={SELECT_LOGGED_USER} userList={userList} />
          </div>
        )}
      </StateContext.Provider>
    </div>
  );
}
