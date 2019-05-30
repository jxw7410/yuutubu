import React from 'react';
import UserModelItem from './user_modal_item';

class UserModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isToggled: false,
        }
        this.togglePopUp = this.togglePopUp.bind(this);
    }

  

    togglePopUp(){
        const isToggled = this.state.isToggled ? false : true;
        this.setState({ isToggled})
    }



    render(){
        return(
            <div id='user-icon-modal-hook'>
                <i onClick={this.togglePopUp} id='user-profile-icon' className="fas fa-user-circle">

                <div id="user-modal-item-ref">
                { this.state.isToggled ? 
                            <UserModelItem 
                                togglePopUp={this.togglePopUp}
                                logOut={this.props.logOut}
                            />
                     : null}
                </div>
                </i>
            </div>
        )
    }
}

export default UserModal;