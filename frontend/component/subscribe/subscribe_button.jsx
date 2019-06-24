import React from 'react';
import { connect } from "react-redux";


class SubscribeButton extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
                {
                    this.props.channel.subbed ?
                        <button id='subscribed-button'> UNSUBSCRIBE {this.props.channel.subscriptionCount}</button> :
                        <button id="subscribe-button"> SUBSCRIBE {this.props.channel.subscriptionCount}</button> 
                }
            </>
        )
    }
}


const msp = (store, props) => {
    return{

    }
}

const mdp = dispatch => {
    return {
        
    }
}



export default connect()(SubscribeButton);

