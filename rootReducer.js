import { combineReducers } from 'redux';
import questReducer from './reducers/quest';
import userReducer from './reducers/user';
import groupReducer from './reducers/group';
import waysReducer from './reducers/ways';
// import locale from './reducers/locale';

export default combineReducers({
  quest: questReducer,
  user: userReducer,
  group: groupReducer,
  ways: waysReducer,
  // locale,
});
