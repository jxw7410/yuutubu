import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

const SubscriptionList = ({isLoggedin, subscriptions, history}) => {
  const [readMore, setReadMore] = React.useState(false);
  const displayLimit = 7;

  function redirectToChannel(channelId) {
    return () => history.push(`/channel/${channelId}`)
  }

  function toggleRead(){
    setReadMore(!readMore);
  }

  function renderSubscriptions() {
    if (!subscriptions.length) return [];

    const listOfSubscriptions = [];
    let limit = subscriptions.length; 

    if (!readMore && limit > displayLimit)
        limit = displayLimit;

    for (let i = 0; i < limit; i++) {
      const subscription = subscriptions[i];
      listOfSubscriptions.push(
        <li key={subscription.id}
          onClick={redirectToChannel(subscription.channel_id)}>
          <i className="fas fa-user-circle" />
          <span className='flexh-3'>
            {subscription.channelName}
          </span>
        </li>
      )
    }
    return listOfSubscriptions;
  }

  return (
    <>
    {
      isLoggedin ?
        <>
          <h1 className='sub-tag'> SUBSCRIPTIONS </h1>
          <ul className='sub-list'>
            { renderSubscriptions() }
            {
              subscriptions.length > displayLimit ?
                readMore ? 
                  <li id='read-less'
                    onClick={toggleRead}>
                    <i id='chev' className='fas fa-chevron-up' />
                    <span className='flexh-3'>
                      Show Less
                    </span>
                  </li>
                  : 
                  <li id='read-more'
                    onClick={toggleRead}>
                      <i id = 'chev' className='fas fa-chevron-down' />
                      <span className='flexh-3'>
                        Show {subscriptions.length - displayLimit} More
                      </span>
                  </li>
              : null
            }
          </ul>
        </> : null
    }
    </>
  )
}


const msp = state => ({
  isLoggedin: Boolean(state.session.id),
  subscriptions: Object.values(state.entities.subscriptions)
});


export default withRouter(connect(msp, null)(SubscriptionList));