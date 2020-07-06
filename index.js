import * as React from 'react';
import { AppRegistry, NativeModules } from 'react-360';
import { RNAppRegistry } from 'react-native';
import array from 'lodash/array'
import InfoPoint from './components/InfoPoint';
import Screen from './components/Screen';
import TopMenu from './components/TopMenu';
// import TopPosts from './TopPosts';
// import CurrentPost from './CurrentPost';
// import ModelView from './ModelView';
// import Slideshow from './Slideshow';
import Ways from './Ways';
// import * as Store from './Store';
// Store.initialize('AIzaSyAaGr7_1scNTGhLbuDCunr6moaNxBtNJHg');

import { createStore, applyMiddleware } from 'redux'
// import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'

const spotModule = NativeModules.spotModule;
const screenModule = NativeModules.screenModule;

const composeEnhancers = composeWithDevTools({ realtime: true, hostname: '192.168.93.93', port: 8000 });
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
));


let infoPoint = new Set()

const selectUser = state => ({
  currentScene: state.user.currentScene,
  currentState: state.user.currentState,
})
const selectScreen = state => ({
  currentVisibility: state.screen.visible,
  currentId: state.screen.id,
})

const mapStateToProps = state => {
  // Выгребаются по одному tooltip, dialog, puzzle, фильтруются по текущей user.currentState и по user.currentScene
  const currentScene = state.user.currentScene
  const currentState = state.user.currentState
  const allTooltips = state.quest.tooltips
  const allStateTooltips = state.quest.state[currentState].tooltips
  const sceneTooltips = Object.entries(allTooltips).map(el => el[1].scene === currentScene && allStateTooltips.find(val => val === el[0]) && { name:el[0], ...el[1] })
  const allDialogs = state.quest.dialogs
  const allStateDialogs = state.quest.state[currentState].dialogs
  const sceneDialogs = Object.entries(allDialogs).map(el => el[1].scene === currentScene && allStateDialogs.find(val => val === el[0]) && { name: el[0], ...el[1] })
  const allPuzzles = state.quest.puzzles
  const allStatePuzzles = state.quest.state[currentState].puzzles
  const scenePuzzles = Object.entries(allPuzzles).map(el => el[1].scene === currentScene && allStatePuzzles.find(val => val === el[0]) && { name: el[0], ...el[1] })
  return {
    spots: array.compact([...sceneTooltips, ...sceneDialogs, ...scenePuzzles]),
  };
}

InfoPointConnector = (params) => (
  <Provider store={store}>
    <InfoPoint params={params} />
  </Provider>
)

surfaceConstructor = (set) => {
  set.forEach((value) => {
    const name = value.name.charAt(0).toUpperCase() + value.name.slice(1)
    console.log('generate ', name)
    AppRegistry.registerComponent(name, () => () => <InfoPointConnector {...value} />)
    spotModule.add(name, value.infopoint)
  })
}
surfaceDestructor = (set) => {
  set.forEach((value) => {
    const name = value.name.charAt(0).toUpperCase() + value.name.slice(1)
    console.log('destruct ', name)
    spotModule.delete(name)
    AppRegistry.unmountApplicationComponentAtRootTag(name)
  })
}

let currentScene, currentState, currentScreenVisibility, currentScreenId
function handleChange() {
  const previousScene = currentScene
  const previousState = currentState
  const state = store.getState()
  const user = selectUser(state)
  currentScene = user.currentScene
  currentState = user.currentState
  const previousScreenVisibility = currentScreenVisibility
  const previousScreenId = currentScreenId
  const screen = selectScreen(state)
  currentScreenVisibility = screen.currentVisibility
  currentScreenId = screen.currentId
  if (previousScene !== currentScene || previousState !== currentState || previousScreenVisibility !== currentScreenVisibility) {
    // surfaceDestructor(infoPoint)
    // infoPoint.clear()
    if (!currentScreenVisibility) {
      const allSpots = mapStateToProps(state).spots
      infoPoint = new Set(allSpots)
      surfaceConstructor(infoPoint)
    }
  }

  if (previousScreenVisibility !== currentScreenVisibility || previousScreenId !== currentScreenId) {
    if (currentScreenVisibility) {
      if (previousScreenId !== currentScreenId) {
        const size = state.screen.size
        const location = state.screen.location
        screenModule.transform(size, location)
      }
      screenModule.show()
    } else {
      screenModule.hide()
    }
  }
}

store.subscribe(handleChange)
handleChange()
// unsubscribe()

WaysConnector = (params) => (
  <Provider store={store}>
    <Ways params={params} />
  </Provider>
)
ScreenConnector = (params) => (
  <Provider store={store}>
    <Screen params={params} />
  </Provider>
)
TopMenuConnector = (params) => (
  <Provider store={store}>
    <TopMenu params={params} />
  </Provider>
)
Tet = (params) => (
  <View>
    <Text>Test123</Text>
  </View>
)

AppRegistry.registerComponent('Ways', () => WaysConnector);
AppRegistry.registerComponent('Screen', () => ScreenConnector);
AppRegistry.registerComponent('TopMenu', () => TopMenuConnector);

AppRegistry.registerComponent('Tet', () => Tet);
AppRegistry.runApplication('Tet');

