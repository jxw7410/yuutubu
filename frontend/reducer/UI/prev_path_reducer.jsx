import {UPDATE_PREV_PATH} from '../../actions/history/prev_path_action';


const prevPathReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case UPDATE_PREV_PATH:
            const path = action.path;
            return {path}
        default:
            return state;
    }
}

export default prevPathReducer;