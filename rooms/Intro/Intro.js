import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment
} from 'react-360';

// import { getFeedbackList } from '../../../actions/feedback';

class Intro extends React.Component {
  constructor(props) {
    super(props);
    // this.state = initialState;
  }

  render() {
    // const { classes } = this.props;
    // const { selectedDate } = this.state;

    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to React 360
            </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

Intro.propTypes = {
  // classes: PropTypes.object.isRequired,
  // intl: intlShape.isRequired,
};

function mapStateToProps(state) {
  return {}
}


export default connect(mapStateToProps, {  })(Intro);
