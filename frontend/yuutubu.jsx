import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './root';

document.addEventListener('DOMContentLoaded', ()=>{
    const root = document.getElementById('root')
    let store;

    if ( window.currentUser ){
        const preloadedState = {
            session: window.currentUser.id 
        }
        store = configureStore(preloadedState);
    } else {
        store = configureStore();
    }

    ReactDOM.render( <Root store={store}/>, root);



    //THESE MUST BE REMOVED IN THE PRODUCTION CODE


    window.getState = store.getState;
    
});