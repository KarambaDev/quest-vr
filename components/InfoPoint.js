import * as React from 'react';
import array from 'lodash/array'
import { AppRegistry } from 'react-360';
// import { Easing } from 'react-native';
import { Animated, AsyncStorage, Image, StyleSheet, NativeModules, Surface, VrButton, View, Text, asset } from 'react-360';
import { connect } from 'react-redux'
import { changeColor } from '../actions/ways';
// import { WaysConnector } from './index';

class InfoPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    // surfaceModule.create(name)
    // surfaceModule.resizeSurf('InfoPoint1',250, 100);
    // surfaceModule.changeSurf('InfoPoint1',"Flat");
    // AsyncStorage.setItem('my-storage-key', 'I like to save it.');
  }

  onButtonClick = async () => {
    // this.setState({ color: '#ff0000'})
    // this.props.changeColor('#ff0000')
    // const value = await AsyncStorage.getItem('my-storage-key');
    // if (value !== null) {
    //   // We have data!
    //   console.log('value = ', value);
    // }
    // surfaceModule.create

    // AppRegistry.registerComponent('Way', () => WaysConnector);
    // surfaceModule.create()
  }

  onEnter = () => {
    console.log('333')
    this.setState({ hover: true })
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 300,
      }
    ).start();
  }
  onExit = () => {
    this.setState({ hover: false })
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
  }

  render() {
    console.log('InfoPoint ', this.fadeAnim)
    const { hint } = this.props
    const size = 30
    return (
      <View style={{
        width: 300,
        height: 120,
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // transform: [
        //   { translateX: 0 },
        //   { translateY: 0 },
        //   { translateZ: 0 },
        //   { rotateX: 50 },
        //   { rotateY: 50 },
        //   { rotateZ: 0 },
        // ]
      }}
      >
        <Animated.View style={{
          padding: 10,
          paddingTop: 0,
          paddingBottom: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderWidth: 1,
          borderColor: '#fff',
          opacity: this.state.fadeAnim,
        }}>
          <Text style={{
            fontWeight: '600',
            fontSize: 24,
            textAlign: 'center',
          }}>
            {hint}
            {/* Tfsf Af asf asf s qtr3qwa sfas fass */}
          </Text>
        </Animated.View>
        <VrButton
          onClick={this.onButtonClick}
          onEnter={this.onEnter}
          onExit={this.onExit}
        >
          <Image source={asset('InfoPoint.png')} style={{
            width: 60,
            height: 60,
            backgroundColor: this.state.hover ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0)',
            borderRadius: 30,
          }} />
        </VrButton>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   panel: {
//     // width: 500,
//     // height: 100,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     transform: [{ translate: [0, 0, 0] }],
//   },
//   panelText: {
//     color: '#000000',
//     fontSize: 30,
//     textAlign: 'center',
//   }
// });

// function mapStateToProps(state) {
//   // Выгребаются по одному tooltip, dialog, puzzle, фильтруются по текущей user.currentState и по user.currentScene
//   const currentScene = state.user.currentScene
//   const currentState = state.user.currentState
//   const allTooltips = state.quest.tooltips
//   const allStateTooltips = state.quest.state[currentState].tooltips
//   const sceneTooltips = Object.entries(allTooltips).map(el => el[1].scene === currentScene && allStateTooltips.find(val => val === el[0]) && { name: el[0], ...el[1] })
//   const allDialogs = state.quest.dialogs
//   const allStateDialogs = state.quest.state[currentState].dialogs
//   const sceneDialogs = Object.entries(allDialogs).map(el => el[1].scene === currentScene && allStateDialogs.find(val => val === el[0]) && { name: el[0], ...el[1] })
//   const allPuzzles = state.quest.puzzles
//   const allStatePuzzles = state.quest.state[currentState].puzzles
//   const scenePuzzles = Object.entries(allPuzzles).map(el => el[1].scene === currentScene && allStatePuzzles.find(val => val === el[0]) && { name: el[0], ...el[1] })
//   return {
//     spots: array.compact([...sceneTooltips, ...sceneDialogs, ...scenePuzzles]),
//   };
// }

export default InfoPoint;
// const ConnectedInfoPoint = connect(mapStateToProps, { changeColor })(InfoPoint)
// export default ConnectedInfoPoint;