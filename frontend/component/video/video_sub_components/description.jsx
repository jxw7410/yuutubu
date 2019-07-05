import React from 'react';


class Description extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            readMore: false,
            expanded: false,
        }
        this.description = React.createRef()
        this.handleReadMore = this.handleReadMore.bind(this);
    }

    componentDidMount() {
        if (this.description.current.offsetHeight > this.props.heightLimit) {
            this.setState({ readMore: true })
        }
    }

    handleReadMore(e) {
        e.preventDefault();
        const expanded = this.state.expanded ? false : true;
        this.setState({ expanded });
    }

    readMore() {
        return (
            this.state.readMore ?
                this.props.readMore(this.state.expanded, this.handleReadMore)
                : null
        )
    }

    render() {
        return (
            <>
                {this.props.render(this.state.expanded, this.description, this.props.description)}
                {this.readMore()}
            </>
        )
    }
}



export default Description;