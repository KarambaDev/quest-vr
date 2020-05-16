// import api from '../api';
import { actions } from '../reducers/ways';

export const getUsers = data => (dispatch) => {
  // dispatch({ type: actions.GET_USERS });
  // return api.users.fetchTable(data)
  //   .then((response) => {
  //     // console.log(response);
  //     dispatch({
  //       type: actions.GET_USERS_SUCCESS,
  //       users: response.result.rows,
  //       rows: response.result.total,
  //     });
  //     return true;
  //   })
  //   .catch((error) => {
  //     dispatch({ type: actions.GET_USERS_FAIL, payload: error });
  //     return false;
  //   });
};
export const changeColor = data => (dispatch) => {
  dispatch({
    type: actions.CHANGE_COLOR,
    color: data,
  });
  // return api.users.fetchTable(data)
  //   .then((response) => {
  //     // console.log(response);
  //     dispatch({
  //       type: actions.GET_USERS_SUCCESS,
  //       users: response.result.rows,
  //       rows: response.result.total,
  //     });
  //     return true;
  //   })
  //   .catch((error) => {
  //     dispatch({ type: actions.GET_USERS_FAIL, payload: error });
  //     return false;
  //   });
};