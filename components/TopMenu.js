import * as React from 'react';
import { View, Text } from 'react-360';
import { connect } from 'react-redux'

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   // hover: true,
    //   // fadeAnim: new Animated.Value(0)
    // };
  }


  render() {
    console.log('TopMenu ', this)
    // const { size, content } = this.props
    // const { width, height } = size
    const width =  300
    const height = 100
    // const { title, description } = content
    const title = "Top Menu"
    const description = "description"
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
        // onExit={this.onExit}
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
    // size: state.screen.size,
    // location: state.screen.location,
    // content: state.screen.content,
    // currentScene: state.user.currentScene,
    // currentState: state.user.currentState,
  };
}

const ConnectedTopMenu = connect(mapStateToProps, {})(TopMenu)
export default ConnectedTopMenu;