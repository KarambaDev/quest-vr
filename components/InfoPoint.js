import * as React from 'react';
import array from 'lodash/array'
import { AppRegistry } from 'react-360';
import { Animated, AsyncStorage, Image, StyleSheet, NativeModules, Surface, VrButton, View, Text, asset } from 'react-360';
import { connect } from 'react-redux'
import { showScreen } from '../actions/screen';
// import { WaysConnector } from './index';
const screenModule = NativeModules.screenModule;

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

    // if (this.props.type === 'Tooltip') {
    //   screenModule.show(this.props.size, this.props.infopoint)
    // }
    this.props.showScreen(this.props.params)
    // console.log(this.props)
  }

  onEnter = () => {
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
    // console.log('InfoPoint ', this)
    const { hint } = this.props.params
    const size = 60
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
          // disabled={true}
        >
          <Image source={asset('InfoPoint.png')} style={{
            width: size,
            height: size,
            backgroundColor: this.state.hover ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0)',
            borderRadius: size/2,
          }} />
        </VrButton>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // ways: allowedWaysFull,
    // disabled: state.screen.visible,
  };
}

const ConnectedInfoPoint = connect(mapStateToProps, { showScreen })(InfoPoint)
export default ConnectedInfoPoint;