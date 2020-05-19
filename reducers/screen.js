export const actions = {
  SHOW_SCREEN: 'SHOW_SCREEN',
  HIDE_SCREEN: 'HIDE_SCREEN',
  // USER_LOGGED_IN_FAIL: 'USER_LOGGED_IN_FAIL',
  // USER_LOGGED_OUT: 'USER_LOGGED_OUT',
};

const initialState = {
  visible: false,
  id: '',
  type: '',
  size: {
    width:300,
    height: 300
  },
  location: {
    x: 0,
    y:0
  },
  content: {},
};

export default function screen(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SHOW_SCREEN:
      return {
        ...state,
        visible: true,
        id: action.payload.id,
        type: action.payload.type,
        size: action.payload.size,
        location: action.payload.location,
        content: action.payload.content,
      };
    case actions.HIDE_SCREEN:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
}
