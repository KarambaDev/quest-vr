import * as React from 'react';
import { Animated, AsyncStorage, Image, StyleSheet, NativeModules, Surface, VrButton, View, Text, asset } from 'react-360';
import { connect } from 'react-redux'
import { hideScreen } from '../actions/screen';
// import { WaysConnector } from './index';

// const screenModule = NativeModules.screenModule;

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // hover: true,
      // fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
  }

  // onButtonClick = async () => {
  // }
  onEnter = () => {
    console.log('onEnter')
  }

  onExit = () => {
    console.log('onExit')
    this.props.hideScreen()
  }

  render() {
    console.log('Screen ', this)
    const { size, content } = this.props
    const { width, height } = size
    const { title, description } = content
    return (
      <View
        // pointerEvents='box-only'
        style={{
          width,
          height,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#000',
          // opacity: this.state.fadeAnim,
        }}
        // onClick={this.onButtonClick}
        // onEnter={this.onEnter}
        onExit={this.onExit}
      >
        {title &&
          <Text
            style={{
              fontWeight: '600',
              fontSize: 24,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        }
        {description &&
          <Text
            style={{
              fontWeight: '600',
              fontSize: 22,
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
        }
      </View>
    );
  }
}

// export default TooltipScreen;

function mapStateToProps(state) {
  return {
    // visible: state.screen.visible,
    size: state.screen.size,
    // location: state.screen.location,
    content: state.screen.content,
    // currentScene: state.user.currentScene,
    // currentState: state.user.currentState,
  };
}

const ConnectedScreen = connect(mapStateToProps, { hideScreen })(Screen)
export default ConnectedScreen;