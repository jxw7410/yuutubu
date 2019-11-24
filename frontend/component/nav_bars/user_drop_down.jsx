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
        className='user-dropdown box-shadow--style-1'>
        <li className='user-dropdown-header--container'>
          <section className='user-dropdown-header'>
            <section id='dropdown-profile-pic' className='flex-horizontal--style-1'>
              <i className='fas fa-user-circle' />
            </section>
            <section id='dropdown-profile-info' className='flex-vertical--style-2'>
              <span>{props.user.username}</span>
              <span>{props.user.email}</span>
            </section>
          </section>
        </li>
        <li className='user-dropdown-body'>
          <ul id='user-dropdown-body--ul'>
            <li onClick={toChannelPage}>
              <div className='flex-horizontal--style-1'>
                <i className='fas fa-user' />
              </div>
              <div className='flex-horizontal--style-3'>
                Your Channel
              </div>
            </li>
            <li onClick={()=> props.logOut()}>
              <div className='flex-horizontal--style-1'>
                <i className='fas fa-sign-out-alt' />
              </div>
              <div className='flex-horizontal--style-3'>
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



