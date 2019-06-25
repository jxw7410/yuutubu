import React from 'react';
import { connect } from "react-redux";
import { subscribe, unsubscribe } from '../../actions/subscribe/subscribe_action';
import { filterSubscriptions } from '../../util/selectors';


class SubscribeButton extends React.Component{
    constructor(props){
        super(props);       
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.updating  = false;
    }


    unsubscribe(e){
        e.preventDefault()
        if (this.props.login)
            if(!this.updating){
                this.updating = true;
                this.props.unsubscribe(this.props.sub.sub_id).then(()=>{
                    this.updating = false;
                })
            }
    }

    subscribe(e){
        e.preventDefault();
        if (this.props.login)
            if(!this.updating){
                this.updating = true;
                this.props.subscribe(this.props.channel.id).then(()=>{
                    this.updating = false;
                })
            }
    }

    render(){
        return(
            <>
                {
                    this.props.sub.sub_id && this.props.login ?
                        <button 
                            onClick={this.unsubscribe}
                            id='subscribed-button'> UNSUBSCRIBE {this.props.channel.subscriptionCount}</button> :
                        <button 
                            onClick={this.subscribe}
                            id="subscribe-button"> SUBSCRIBE {this.props.channel.subscriptionCount}</button> 
                }
            </>
        )
    }
}


const msp = (store, props) => {
    return{
        login: Boolean(store.session.id),
        sub: filterSubscriptions(props.channel.id, Object.values(store.entities.subscriptions))
    }
}

const mdp = dispatch => {
    return {
        subscribe: channel_id => dispatch(subscribe(channel_id)),
        unsubscribe: sub_id => dispatch(unsubscribe(sub_id)),
    }
}



export default connect(msp, mdp)(SubscribeButton);

