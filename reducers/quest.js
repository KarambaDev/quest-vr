export const actions = {
  // USER_LOGGED_IN: 'USER_LOGGED_IN',
  // USER_LOGGED_IN_SUCCESS: 'USER_LOGGED_IN_SUCCESS',
  // USER_LOGGED_IN_FAIL: 'USER_LOGGED_IN_FAIL',
  // USER_LOGGED_OUT: 'USER_LOGGED_OUT',
};

const initialState = {
  state: {
    'state0': {
      // Available Scenes
      scenes: [ 'scene0', 'scene1', 'scene2' ],
      tooltips: [ 'tooltip0', 'tooltip1', 'tooltip2' ],
      puzzles: [ 'puzzle0', 'puzzle1' ],
      dialogs: [ 'dialog0' ],
    },
    'state1': {
      scenes: [ 'scene0', 'scene1', 'scene2', 'scene3' ],
      dialogs: ['dialog0'],
    }
  },
  scenes: {
    'scene0': {
                  background: 'bank_scene0_state0.jpg',
      'state1': { background: 'bank_scene0_state1.jpg' },
      'state2': { background: 'bank_scene0_state2.jpg' },
    },
    'scene1': {
                  background: 'bank_scene1_state0.jpg',
      'state1': { background: 'bank_scene1_state1.jpg' },
      'state2': { background: 'bank_scene1_state2.jpg' },
    },
    'scene2': {
                  background: 'bank_scene2_state0.jpg',
      'state1': { background: 'bank_scene2_state1.jpg' },
      'state2': { background: 'bank_scene2_state2.jpg' },
    },
  },
  ways: [
    {
      scene: 'scene0',
      wayToScene: 'scene1',
      location: { x: 0, z: -400, angle: 0},
    },
    {
      scene: 'scene1',
      wayToScene: 'scene0',
      location: { x: 300, z: 150, angle: 90 },
    },
    {
      scene: 'scene1',
      wayToScene: 'scene2',
      location: { x: 0, z: -400, angle: 0 },
    },
  ],
  tooltips: {
    'tooltip0': {
      scene: 'scene0',
      hint: 'hint',
      description: 'description',
      type: 'TiltComponent',
      infopoint: {
        x: 0.1,
        y: 0,
      }
    },
    'tooltip1': {
      scene: 'scene0',
      hint: 'hint',
      description: 'description',
      type: 'TiltComponent',
      infopoint: {
        x: 0.3,
        y: 0,
      }
    },
    'tooltip2': {
      scene: 'scene1',
      hint: 'hint',
      description: 'description',
      type: 'TiltComponent',
      infopoint: {
        x: 0.3,
        y: 0,
      }
    },
      //'tooltip1', 'tooltip2'
  },
  puzzles: {
    'puzzle0': {
      scene: 'scene0',
      hint: 'hint',
      description: 'description',
      type: 'TiltComponent',
      infopoint: {
        x: -0.3,
        y: 0.2,
      }
    },
    //'puzzle1'
  },
  dialogs: {
    'dialog0': {
      scene: 'scene0',
      hint: 'hint',
      description: 'description',
      type: 'TiltComponent',
      infopoint: {
        x: -0.1,
        y: -0.3,
      }
    }
  },
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case actions.USER_LOGGED_IN:
      return {
        ...state,
        authFetching: true,
      };
    case actions.USER_LOGGED_IN_SUCCESS:
      return {
        ...state,
        authFetching: false,
        auth: action.auth,
        authError: null,
      };
    case actions.USER_LOGGED_IN_FAIL:
      return {
        ...state,
        authFetching: false,
        authkey: null,
        authError: action.error,
      };
    case actions.USER_LOGGED_OUT:
      return {
        authFetching: false,
        authError: null,
        auth: null,
      };
    default:
      return state;
  }
}
