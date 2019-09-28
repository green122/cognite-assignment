import React from 'react';
import ReactDOM from 'react-dom';
import App, { reducer, initialState, SELECT_CHAT_USER, SELECT_LOGGED_USER } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('reducer', () => {
  it('should set logged user  ', () => {
    expect(reducer(initialState, {type: SELECT_LOGGED_USER, payload: 'testuser'}).loggedUser).toBe('testuser');
  });
  it('should set chat user  ', () => {
    expect(reducer(initialState, {type: SELECT_CHAT_USER, payload: 'testchatuser'}).chatUser).toBe('testchatuser');
  });
});