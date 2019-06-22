import React from 'react';


class Search extends React.Component{
    constructor(props) {
        super(props);
    }


    componentDidMount(){
        this.props.updateSearchHistory(this.props.match.params)
    }

    componentDidUpdate(prevProps){  
        if (prevProps.match.params.query !== this.props.match.params.query){
            this.props.updateSearchHistory(this.props.match.params)
        }
    }

    render() {
        return (
            <div>
                This is the search page, a soon to be feature
            </div>
        )
    }
}


export default Search;