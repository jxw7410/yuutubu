import React from 'react';

class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isToggled: false
        }

        this.togglePopUp = this.togglePopUp.bind(this);

    }



    togglePopUp() {
        const isToggled = this.state.isToggled ? false : true;
        this.setState({ isToggled })
    }



    render(){
        return(
            <div id={this.props.target}>
                
            </div>
        )
    }
}