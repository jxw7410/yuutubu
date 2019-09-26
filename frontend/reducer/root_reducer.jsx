import { combineReducers } from 'redux';
import sessionReducer from './auth/session_reducer';
import entitiesReducer from './entities/entities_reducer';
import errorsReducer from './errors/errors_reducer';
import UIReducer from './UI/ui_reducer';
import scrollingPaginationOffsetReducer from './pagination/scrolling_pagination_reducer';

export default combineReducers({
	entities: entitiesReducer,
	session: sessionReducer,
	errors: errorsReducer,
	ui: UIReducer,
	scrollingPaginationOffset: scrollingPaginationOffsetReducer,
});

