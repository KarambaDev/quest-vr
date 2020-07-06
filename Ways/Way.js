import * as React from 'react';
import { Animated, Environment, VrButton, View, asset } from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';
// import { connect } from './Store';
import { connect } from 'react-redux'
import { getUsers } from '../actions/ways';
import { changeScene } from '../actions/user';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
class Way extends React.Component {
  constructor(props) {
    super();
    this.state = {
      toValue: 90
    };
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.wave()
  }

  wave() {
     this.animatedValue.setValue(0)
     Animated.timing(this.animatedValue, { toValue: 1, duration: 8000 }).start(() => this.wave())
  }

  changeScene = background => {
    Environment.setBackgroundImage(asset(background), {
      format: '2D',
      transition: 100,
      fadeLevel: 1, // as FadeLevel is in [0, 1] range
      // rotateTransform: [{ rotateY: '30deg' }, {rotateZ: '90rad'}],
    });
    this.props.changeScene(this.props.wayToScene)
  }

  render() {
    const { x, z, angle, background } = this.props
    // console.log('props', this.props)
    const rotation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [60 + angle, 120 + angle, 60 + angle]
    })
    return (
      <View
        style={{
          opacity: 0.1,
          transform: [
            {translateX: x},
            {translateZ: z},
            // {translateX: 0},
            // {translateZ: -400},
          ]
        }}
      >
          {/* <Entity 
          style={{
            transform: [
              {translateX: -400},
              {translateY: 100},
              {translateZ: 400},
            ]
          }}
            source={{
              // gltf2: asset('model2.gltf'),
              // bin: asset('model2.bin'),
              obj: asset('model2.obj'),
              mtl: asset('model2.mtl')
            }} 
          /> */}
          {/* <AmbientLight intensity={1.0} color={'#0000ff'} />
          <PointLight
            intensity={1}
            // style={{ transform: [{ translate: [0, 4, -10] }] }}
          style={{ color: 'red', transform: [{ translate: [0, 0, -200] }] }}
          /> */}
        <VrButton onClick={() => this.changeScene(background)}>
          <AnimatedEntity
            // style={{ transform: [{ rotateY: this.rotation }] }}
            style={{
              transform: [
                // translateY: 100,
                // {translateX: 100},
                {rotateY: rotation},
                // {translateZ: 400},
                // rotateX: 0,
                // rotateZ: 0,
              ],
              color: '#7f4ffd',
              opacity: 0.5,
            }}
            source={{ 
              // obj: asset('arrow.obj'), 
              // mtl: asset('arrow2.mtl')
              obj: asset('model2.obj'),
              // mtl: asset('model2.mtl')
              // gltf2: asset('model2.gltf'),
              // bin: asset('model2.bin')
            }}
          />
        </VrButton>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state', state)
  return {
    // authError: state.quest.auth.authError,
  };
}

const ConnectedWay = connect(mapStateToProps, { changeScene })(Way)
export default ConnectedWay;