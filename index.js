import * as React from 'react';
import { AppRegistry, NativeModules } from 'react-360';
import array from 'lodash/array'
import InfoPoint from './components/InfoPoint';
import TopPosts from './TopPosts';
import CurrentPost from './CurrentPost';
import ModelView from './ModelView';
import Slideshow from './Slideshow';
import Ways from './Ways';
// import * as Store from './Store';
// Store.initialize('AIzaSyAaGr7_1scNTGhLbuDCunr6moaNxBtNJHg');

import { createStore, applyMiddleware } from 'redux'
// import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'

// const surfaceModule = NativeModules.surfaceModule;
const spotModule = NativeModules.spotModule;
// const store = configureStore({
// reducer: rootReducer,
// });

const composeEnhancers = composeWithDevTools({ realtime: true, hostname: '192.168.93.93', port: 8000 });
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
));

let infoPoint = new Set()
// let state = {
//   points: {
//     InfoPoint1: {},
//     InfoPoint2: {}
//   }
// }

WaysConnector = (params) => (
  <Provider store={store}>
    <Ways params={params} />
  </Provider>
  )

// InfoPointsConnector = () => {
//   return (
//     <Provider store={store}>
//       {/* {Object.entries(state.points).forEach((Key, value)=>{
//         <Key />
//       })} 
//       }
//       */}
//       <InfoPoints />
//     </Provider>
//   )
// }

const select = state => ({
  currentScene: state.user.currentScene,
  currentState: state.user.currentState,
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

surfaceConstructor = (set) => {
  set.forEach((value) => {
    const name = value.name.charAt(0).toUpperCase() + value.name.slice(1)
    console.log('generate ', name)
    AppRegistry.registerComponent(name, () => () => <InfoPoint {...value} />)
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

let user, currentScene, currentState
function handleChange() {
  let previousScene = currentScene
  let previousState = currentState
  user = select(store.getState())
  currentScene = user.currentScene
  currentState = user.currentState
  if (previousScene !== currentScene || previousState !== currentState) {
    surfaceDestructor(infoPoint)
    infoPoint.clear()
    const allSpots = mapStateToProps(store.getState()).spots
    infoPoint = new Set(allSpots)
    // console.log(infoPoint)
    surfaceConstructor(infoPoint)
  }
}

store.subscribe(handleChange)
handleChange()
// unsubscribe()

AppRegistry.registerComponent('Way', () => WaysConnector);
