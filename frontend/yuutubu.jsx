import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './root';

document.addEventListener('DOMContentLoaded', ()=>{
    const root = document.getElementById('root')
    let store;

    if ( window.currentUser ){
        const preloadedState = {
            session:
            { 
                id: window.currentUser.id,
                email: window.currentUser.email,
                username: window.currentUser.username,
                channel_id: window.currentUser.channel_id
            },

            entities: {
                users: {
                    [window.currentUser.id] : {
                        id: window.currentUser.id,
                        email: window.currentUser.email,
                        username: window.currentUser.username,
                        channel_id: window.currentUser.channel_id
                    }
                }
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