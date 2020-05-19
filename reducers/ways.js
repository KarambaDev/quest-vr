export const actions = {
  CHANGE_COLOR: 'CHANGE_COLOR',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAIL: 'GET_USERS_FAIL',
  GET_ONE_USER: 'GET_ONE_USER',
  GET_ONE_USER_SUCCESS: 'GET_ONE_USER_SUCCESS',
  GET_ONE_USER_FAIL: 'GET_ONE_USER_FAIL',
  GET_USER_DATA: 'GET_USER_DATA',
  GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS',
  GET_USER_DATA_FAIL: 'GET_USER_DATA_FAIL',
  ADD_USER: 'ADD_USER',
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
  ADD_USER_FAIL: 'ADD_USER_FAIL',
  SAVE_USER: 'SAVE_USER',
  SAVE_USER_SUCCESS: 'SAVE_USER_SUCCESS',
  SAVE_USER_FAIL: 'SAVE_USER_FAIL',
  DELETE_USER: 'DELETE_USER',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAIL: 'DELETE_USER_FAIL',
  CLEAN_STATE: 'CLEAN_STATE',
};

const initialState = {
  ways: [],
  color: '#000',
};

export default function ways(state = initialState, action = {}) {
  switch (action.type) {
    case actions.CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        usersFetching: false,
        // users: action.payload,
        users: action.users,
        rows: action.rows,
        usersError: null,
      };
    case actions.GET_USERS_FAIL:
      return {
        ...state,
        usersFetching: false,
        users: [],
        usersError: action.payload,
      };
    case actions.GET_ONE_USER:
      return {
        ...state,
        usersFetching: true,
      };
    case actions.GET_ONE_USER_SUCCESS:
      return {
        ...state,
        usersFetching: false,
        singleUser: action.payload,
        usersError: null,
      };
    case actions.GET_ONE_USER_FAIL:
      return {
        ...state,
        usersFetching: false,
        singleUser: null,
        usersError: action.payload,
      };
    case actions.GET_USER_DATA:
      return {
        ...state,
        userDataFetching: true,
      };
    case actions.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userDataFetching: false,
        userData: action.payload,
        userDataError: null,
      };
    case actions.GET_USER_DATA_FAIL:
      return {
        ...state,
        userDataFetching: false,
        userData: null,
        userDataError: action.payload,
      };
    case actions.ADD_USER:
      return {
        ...state,
        addUserFetching: true,
      };
    case actions.ADD_USER_SUCCESS:
      return {
        ...state,
        addUserFetching: false,
        addUser: action.payload,
        addUserError: null,
      };
    case actions.ADD_USER_FAIL:
      return {
        ...state,
        addUserFetching: false,
        addUser: null,
        addUserError: action.payload,
      };
    case actions.SAVE_USER:
      return {
        ...state,
        saveUserFetching: true,
      };
    case actions.SAVE_USER_SUCCESS:
      return {
        ...state,
        saveUserFetching: false,
        saveUser: action.payload,
        saveUserError: null,
      };
    case actions.SAVE_USER_FAIL:
      return {
        ...state,
        saveUserFetching: false,
        saveUser: null,
        saveUserError: action.payload,
      };
    case actions.DELETE_USER:
      return {
        ...state,
        deleteUserFetching: true,
      };
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserFetching: false,
        deleteUser: action.payload,
        deleteUserError: null,
      };
    case actions.DELETE_USER_FAIL:
      return {
        ...state,
        deleteUserFetching: false,
        deleteUser: null,
        deleteUserError: action.payload,
      };
    case actions.CLEAN_STATE:
      return initialState;

    default:
      return state;
  }
}
