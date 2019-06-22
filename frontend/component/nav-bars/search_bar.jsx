import React from 'react';
import SearchModal from '../modals/search_modal';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: "",
            fetching: false,
            openModal: false,
            selected: null,
            sliceLength: 0,
        }

        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.updateText = this.updateText.bind(this);
        this.updateIndex = this.updateIndex.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeModal() {
        this.setState({ openModal: false })
    }

    updateText(inputText) {
        this.setState({ inputText })
    }

    updateIndex(index) {
        this.setState({ selected: index })
    }

    handleFocus(e) {
        e.preventDefault();
        if (!this.state.fetching) {
            this.state.fetching = true;
            setTimeout(() => this.props.requestSearchQueries(this.state.inputText.trim()).then(() => {
                this.setState({ fetching: false, openModal: true, selected: null })
            }).fail(
                () => {
                    this.setState({ fetching: false, openModal: false, selected: null })
                }
            ), 200);
        }

    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ inputText: e.target.value, sliceLength: e.target.value.length, selected: null })
        if (!this.state.fetching) {
            setTimeout(() => {
                this.state.fetching = true;
                this.props.requestSearchQueries(this.state.inputText.trim()).then(() => {
                    this.setState({ fetching: false, openModal: true, selected: null });
                }
                ).fail(
                    () => {
                        this.setState({ fetching: false, openModal: false, selected: null })
                    });
            }, 200);
        }
    }


    handleKeyPress(e) {
        if (e.key === 'ArrowUp' || e.keyCode === 38) {
            e.preventDefault();
            if (this.state.selected === null) {
                this.setState({ selected: this.props.searches.length - 1 })
            }
            else if (this.state.selected === 0) {
                this.setState({ selected: null })
            }
            else {
                this.setState({ selected: this.state.selected - 1 })
            }


        } else if (e.key === 'ArrowDown' || e.keyCode === 40) {
            e.preventDefault();
            if (this.state.selected === null)
                this.setState({ selected: 0 })
            else if (this.state.selected === this.props.searches.length - 1)
                this.setState({ selected: null })
            else
                this.setState({ selected: this.state.selected + 1 })

        }
    }


    handleBlur(e) {
        e.preventDefault();
        this.setState({ openModal: false })
    }


    handleSubmit(e) {
        e.preventDefault();
        this.closeModal();
        if (this.state.inputText.length > 0) {
            this.props.history.push(`/search/${this.state.inputText}`)
        }
    }

    render() {
        return (
            <form id='search-bar' onSubmit={this.handleSubmit}>
                <div id='search-bar-input-ctn'>
                    <input id='search-bar-input'
                        type='text'
                        placeholder='Search'
                        autoComplete='off'
                        onKeyDown={this.handleKeyPress}
                        value={this.state.inputText}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onSubmit={this.handleSubmit}
                        onBlur={this.handleBlur}

                    />
                    <SearchModal
                        inputTextLength={this.state.sliceLength}
                        openModal={this.state.openModal}
                        selected={this.state.selected}
                        updateText={this.updateText}
                        updateIndex={this.updateIndex}
                    />
                </div>
                <button id='search-bar-button'
                    onClick={this.handleSubmit}
                > <i className="fas fa-search"></i> </button>
            </form>
        )
    }
}

export default withRouter(SearchBar);