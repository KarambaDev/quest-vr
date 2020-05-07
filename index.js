import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

import { AppRegistry } from 'react-360';

import Intro from './rooms'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default class Hello360 extends React.Component {
  render() {
    // Set the background to a 360 or 180 image
    Environment.setBackgroundImage(
      asset('360_world.jpg')
    );
    return (
      <Provider store={store}>
        <Intro  />
      </Provider>
    );
  }
};

AppRegistry.registerComponent('Hello360', () => Hello360);
