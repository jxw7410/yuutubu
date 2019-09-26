import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash'
import { filterSearchModalResults, filterByWords } from '../../util/selectors';
import SearchModalListItem from './search_modal_list_item';


// Todo: React Hook, figure out how prevProps works in Hooks.
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
			const initialString = obj.context.slice(0, this.props.inputTextLength);
			const remenantString = obj.context.slice(this.props.inputTextLength);

			const _class = `${this.props.selected === index ? 'sbsd_d' : ""} ${obj.category ? "history" : ""}`;

			return <SearchModalListItem key={index}
				index={index}
				initialString={initialString}
				remenantString={remenantString}
				selected={this.props.selected}
				_class={_class}
				updateIndex={this.props.updateIndex}
				updateText={this.props.updateText}
				closeModal={this.props.closeModal}
			/>

		});

		return listItems;
	}

	render() {
		const ext = this.props.openModal && this.props.searches.length ? "sm-active" : "";
		if (this.textDidChange && !this.props.fetching) {
			this.textDidChange = false;
			this.searchPhrase = this.props.word;
		}

		const listItems = this.searches();

		return (
			<Fragment>
				{
					listItems.length ?
						<div className={`sch-mdl ${ext}`}
							onMouseEnter={e => this.props.updateFocus(true)}
							onMouseLeave={e => this.props.updateFocus(false)}>
							<ul className='sm-list flexv-4'> {listItems} </ul>
						</div > : null
				}
			</Fragment>
		)
	}
}






const msp = state => {
	const historyArray = sortBy(Object.values(state.entities.history), 'updated_at').reverse();
	return {
		searches: filterSearchModalResults(historyArray, Object.values(state.entities.searches)),
	}
}


export default connect(msp)(SearchModal)