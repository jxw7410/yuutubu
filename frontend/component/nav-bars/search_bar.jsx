import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: "",
            fetching: false,
        }

        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleFocus(e) {
        e.preventDefault();
        if (!this.state.inputText)
            console.log('fetching history');
        else {
            if (!this.state.fetching) {
                this.state.fetching = true;
                this.props.requestSearchQueries(this.state.inputText).then((response) => {
                    this.setState({ fetching: false })
                    this.props.openModal('search');
                }
                );
            }
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ inputText: e.target.value })
        setTimeout(() => {
            if (!this.state.fetching) {
                this.state.fetching = true;
                this.props.requestSearchQueries(this.state.inputText).then(() =>{
                    this.setState({ fetching: false });
                    this.props.openModal('search');
                }
                );
            }
        }, 0)
    }

    render() {
        return (
            <section id='search-bar'>
                <input id='search-bar-input'
                    type='text'
                    placeholder='Search'
                    value={this.state.inputText}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                />
                <button id='search-bar-button'> <i className="fas fa-search"></i> </button>
            </section>
        )
    }
}

export default SearchBar;