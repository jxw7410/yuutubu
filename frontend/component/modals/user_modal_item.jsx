import React from 'react';


class UserModalItem extends React.Component {
    constructor(props){
        super(props);
        this.modalRef = null;
        this.handleClick = this.handleClick.bind(this)
    }
    
    componentDidMount(){
        document.addEventListener('click', this.handleClick)
        this.modalRef = document.getElementById("user-modal-item-ref");
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick);
    }

    handleClick(e){
        e.preventDefault();
        if (!this.modalRef.contains(e.target))
            this.props.togglePopUp();
    }

    render(){
        return(
            <div  id='user-modal-item'>
                <button onClick={ this.props.logOut }>Sign Out</button>
            </div>
        )
    }
}

export default UserModalItem;