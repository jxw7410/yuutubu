import { connect } from "react-redux";
import SearchBar from './search_bar';
import { requestSearchQueries } from "../../actions/search/search_action";
import { openModal } from "../../actions/modal/modal_action";
import { sortBy } from 'lodash';
import { filterSearchModalResults } from '../../util/selectors';


const msp = state => {
  const historyArray = sortBy(Object.values(state.entities.history), 'updated_at').reverse();
  return {
    isLogin: Boolean(state.session.id),
    searches: filterSearchModalResults(historyArray, Object.values(state.entities.searches))
  }
};


const mdp = dispatch => ({
  requestSearchQueries: text => dispatch(requestSearchQueries(text)),
  openModal: type => dispatch(openModal(type)),
});



export default connect(msp, mdp)(SearchBar)