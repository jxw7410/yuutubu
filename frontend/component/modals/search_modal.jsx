import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash'
import { filterSearchModalResults, filterByWords } from '../../util/selectors';
import SearchModalListItem from './search_modal_list_item';



class SearchModal extends React.Component {
    constructor(props) {
        super(props);
        this.textDidChange = false;
        this.searchPhrase = "";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fetching === true && this.props.fetching === false) {
            this.textDidChange = true;
        }
    }


    searches() {
        const searches = filterByWords(this.searchPhrase, this.props.searches);
        const listItems = searches.map((obj, index) => {
            let initialString;
            let remenantString;
            if (obj.category) {
                initialString = obj.context.slice(0, this.props.inputTextLength);
                remenantString = obj.context.slice(this.props.inputTextLength);
            } else {
                initialString = obj.context.slice(0, this.props.inputTextLength);
                remenantString = obj.context.slice(this.props.inputTextLength);
            }

            let _class1 = this.props.selected === index ? "sbsd_d" : ""
            let _class2 = obj.category ? " history" : "";

            return <SearchModalListItem key={index}
                index={index}
                initialString={initialString}
                remenantString={remenantString}
                selected={this.props.selected}
                _class={_class1 + _class2}
                updateIndex={this.props.updateIndex}
                updateText={this.props.updateText}
                closeModal={this.props.closeModal}
            />

        });

        return listItems;
    }

    render() {
        const extension = this.props.openModal && this.props.searches.length  ? "sm-active" : "";
        if (this.textDidChange && !this.props.fetching) {
            this.textDidChange = false;
            this.searchPhrase = this.props.word;
        }

        const listItems = this.searches();

        return (
            <React.Fragment>
                {
                    listItems.length ? 
                    <div className={`sch-mdl ${extension}`}
                        onMouseEnter={e => this.props.updateFocus(true)}
                        onMouseLeave={e => this.props.updateFocus(false)}>
                            <ul  className='sm-list flexv-4'> {listItems} </ul>
                    </div > : null
                }
            </React.Fragment>
        )
    }
}



const msp = (state, props) => {
    const historyArray = sortBy(Object.values(state.entities.history), 'updated_at').reverse();
    return {
        searches: filterSearchModalResults(historyArray, Object.values(state.entities.searches)),
    }
}


export default connect(msp)(SearchModal)