import React from 'react';
import UserModelItem from './user_modal_item';
import { connect } from 'react-redux';


class UserModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isToggled: false,
        }
        this.togglePopUp = this.togglePopUp.bind(this);
        this.ref = 'modal-item-ref';
    }

  

    togglePopUp(){
        const isToggled = this.state.isToggled ? false : true;
        this.setState({ isToggled})
    }



    render(){
        return(
            <div id='user-icon-modal-hook'>
                <i key={'1'} onClick={this.togglePopUp} id='user-icon' className="fas fa-user-circle"/>

                <div id={this.ref}>
                    {this.state.isToggled ?
                        <UserModelItem
                            togglePopUp={this.togglePopUp}
                            logOut={this.props.logOut}
                            user={this.props.user}
                            node={this.ref}
                        />
                        : null}
                </div>
            </div>
        )
    }
}


const msp = state => {
    const user = state.entities.users[state.session.id]
    return {
        user
    }
}

export default connect(msp)(UserModal);