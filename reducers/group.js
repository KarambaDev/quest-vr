export const actions = {
  // USER_LOGGED_IN: 'USER_LOGGED_IN',
  // USER_LOGGED_IN_SUCCESS: 'USER_LOGGED_IN_SUCCESS',
  // USER_LOGGED_IN_FAIL: 'USER_LOGGED_IN_FAIL',
  // USER_LOGGED_OUT: 'USER_LOGGED_OUT',
};

const initialState = {
  groupId: 1,
  state: 0,
  inventory: {},
};

export default function group(state = initialState, action = {}) {
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
