import { connect } from 'react-redux';
import { signUp, defaultAction, raiseEmailError } from '../../actions/session/session_action';
import { convertErrorMessageToObject } from '../../util/selectors';
import { removeNavBars } from '../../actions/nav/nav_bar_action';
import { removeVideoPlayer } from '../../actions/video_player/video_player';
import SignUpForm from './signup';

const msp = state => {
  const errors = convertErrorMessageToObject(state.errors)
  return {
    errors,
  }
}


const mdp = dispatch => {
  return {
    signUp: user => dispatch(signUp(user)),
    defaultAction: () => dispatch(defaultAction()),
    raiseEmailError: () => dispatch(raiseEmailError()),
    removeNavBars: () => dispatch(removeNavBars()),
    removeVideoPlayer: () => dispatch(removeVideoPlayer())
  }
};


export default connect(msp, mdp)(SignUpForm)