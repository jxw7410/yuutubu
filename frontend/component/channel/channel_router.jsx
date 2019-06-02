import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ChannelContainer from './channel_container';
import {fetchChannel} from '../../actions/channel/channel_action';

class ChannelRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChannel: null,
            request: false
        }
        this.didUpdate = false;
    }


    componentDidMount() {
        this.props.fetchChannel(this.props.match.params.channel_id)
            .then( () => {
                    this.didUpdate = true;
                    this.setState({isChannel: true})})
            .fail( () => {
                    this.didUpdate = true
                    this.setState({ isChannel: false })})
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.url  !== this.props.match.url)
        
            this.props.fetchChannel(this.props.match.params.channel_id)
                .then(() => {
                    this.didUpdate = true;
                    this.setState({ isChannel: true })
                })
                .fail(() => {
                    this.didUpdate = true
                    this.setState({ isChannel: false })
                })
        else 
            this.didUpdate = true;
    }


    render() {
        if (this.didUpdate) {
            this.didUpdate = false;
            return (
                <Route
                    path={this.props.path}
                    exact={this.props.exact}
                    render={props => (
                        this.state.isChannel ? <ChannelContainer {...props} /> : <Redirect to='/'  />
                    )}
                />
            )
        } else {
            return (
                <div>Please Wait...</div>
            )
        }
    }

}




const mdp = dispatch => {
    return {
        fetchChannel:  channel_id => dispatch(fetchChannel(channel_id)),

    }
}

export default connect(null , mdp)(ChannelRouter);