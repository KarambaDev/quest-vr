import * as React from 'react';
import { View } from 'react-360';
import Way from './Way';
// import AmbientLight from 'AmbientLight';
// import PointLight from 'PointLight';
import { connect } from 'react-redux'
import { getUsers } from '../actions/ways';

function Ways(props) {
  const { ways } = props
  // console.log('ways props', props)
  return (
    <View>
      { ways.length > 0 && ways.map((way, key) => (
        <Way
          key={key}
          x={way.location.x}
          z={way.location.z}
          angle={way.location.angle}
          wayToScene={way.wayToScene}
          background={way.background}
        />
      )) }
    </View>
  )
}

function mapStateToProps(state) {
  // При отображении сцены выгребается весь масссив ways, фильтруется по quest.ways.scene === user.currentScene,
  // затем по пересечению ways.wayToScene и quest.state[user.currentState].scenes
  const currentScene = state.user.currentScene
  const currentState = state.user.currentState
  const allWays = state.quest.ways
  const allStateScenes = state.quest.state[currentState].scenes
  const sceneWays = allWays.filter(way => way.scene === currentScene)
  const allowedWays = sceneWays.filter(way => allStateScenes.includes(way.wayToScene));
  const allowedWaysFull = allowedWays.map(way => {
    const scene = state.quest.scenes[way.wayToScene]
    const background = scene[currentState] ? scene[currentState].background : scene.background
    return { ...way, background}
  })
  // console.log('allStateScenes', allStateScenes)
  // console.log('sceneWays', sceneWays)
  // console.log('allowedWays', allowedWays)
  // console.log('allowedWaysFull', allowedWaysFull)
  return {
    ways: allowedWaysFull,
  };
}

const ConnectedWays = connect(mapStateToProps, { getUsers })(Ways)
export default ConnectedWays;
