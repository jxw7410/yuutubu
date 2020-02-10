export const UPDATE_PREV_PATH = 'UPDATE_PREV_PATH';


const updatePrevPath = path => ({
  type: UPDATE_PREV_PATH,
  path
});


export const requestUpdatePrevPath = path => dispatch => {
  dispatch(updatePrevPath(path));
}




