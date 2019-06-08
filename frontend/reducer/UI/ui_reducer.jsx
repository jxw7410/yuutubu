import {combineReducers} from 'redux';
import modalReducer from './modal_reducer';
import navBarsReducer  from './nav_bar_reducer';

export default combineReducers({
    modal: modalReducer,
    navBars: navBarsReducer
});

