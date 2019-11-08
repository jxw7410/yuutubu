import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from '../../actions/session/session_action'


const UserDropdown = props => {
  const [displayDropdown, changeState] = React.useState(false);

  function toChannelPage(e) {
    changeState(false);
    props.history.push(`/channel/${props.user.channel_id}`)
  }

  function toggleDropdown(e) {
    if(e.currentTarget === e.target){
      const newState = !displayDropdown;
      changeState(newState);
    }
  }

  return (
    <div 
      tabIndex='0'
      onBlur={() => changeState(false)}
      className='dropdown-container'>
      <i
        onClick={toggleDropdown} 
        className="fas fa-user-circle" />

      <ul style={ displayDropdown ? null : {display: 'none'}} 
        className='usr-mdl-i box-shad-s1'>
        <li className='usr-mdl-hdr'>
          <section className='umh-d'>
            <section id='mpp' className='flexh-1'>
              <i className='fas fa-user-circle' />
            </section>
            <section id='mpi' className='flexv-2'>
              <span>{props.user.username}</span>
              <span>{props.user.email}</span>
            </section>
          </section>
        </li>
        <li className='um-sec-1'>
          <ul id='um-sec-1-ul'>
            <li onClick={toChannelPage}>
              <div className='flexh-1'>
                <i className='fas fa-user' />
              </div>
              <div className='flexh-3'>
                Your Channel
              </div>
            </li>
            <li onClick={()=> props.logOut()}>
              <div className='flexh-1'>
                <i className='fas fa-sign-out-alt' />
              </div>
              <div className='flexh-3'>
                Sign Out
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>  
  )
}


const msp = state => ({
  user: state.session
})

const mdp = dispatch => ({
  logOut: () => dispatch(logOut())
});

export default withRouter(connect(msp, mdp)(UserDropdown));



