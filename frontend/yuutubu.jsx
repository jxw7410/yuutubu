import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './root';

document.addEventListener('DOMContentLoaded', ()=>{
    console.log("Testing")
    const root = document.getElementById('root')
    let store;

    if ( window.currentUser ){
        const preloadedState = {
            session:
            { 
                id: window.currentUser.id,
                email: window.currentUser.email
            }
        }
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    ReactDOM.render( <Root store={store}/>, root);



    //THESE MUST BE REMOVED IN THE PRODUCTION CODE


    window.getState = store.getState;
    
});