import React from 'react';


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




export default SubscribeButton;

