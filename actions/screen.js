import { actions } from '../reducers/screen';

export const showScreen = data => (dispatch) => {
  console.log('showScreen data: ', data)
  const { name, type, size, infopoint, content} = data
  dispatch({
    type: actions.SHOW_SCREEN,
    payload: {
      id: name,
      type,
      size,
      location: infopoint,
      content,
    },
  });
};
export const hideScreen = data => (dispatch) => {
  dispatch({
    type: actions.HIDE_SCREEN,
  });
};