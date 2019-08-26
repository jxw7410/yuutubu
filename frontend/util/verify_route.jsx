import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// HOC to verify wheter a route is actually a good route
class VerifyRouter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isResource: null,
            resource: null
        }

        this.didUpdate = false;
    }

    componentDidMount(){
        this.fetchResource();
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.url !== this.props.match.url)
            this.fetchResource()
        else 
            this.didUpdate = true;
    }

    fetchResource(){
        this.props.fetchResource(this.props.match.params[`${this.props.type}_id`])
            .then(() => {
                this.didUpdate = true;
                this.setState({ isResource: true })
            })
            .fail(() => {
                this.didUpdate = true;
                this.setState({ isResource: false })
            })
    }

    render(){
        if (this.didUpdate) {
            this.didUpdate = false; 
            const Component = this.props.component;
            return <Route 
                        path={this.props.path}
                        exact={this.props.exact}
                        render={props =>
                            this.state.isResource ? 
                                <Component {...props} />
                                : <Redirect to='/' /> }
                    />
        } else {
            return <div/>
        }
    }
}

export default VerifyRouter;