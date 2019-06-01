import * as ChannelAPI from '../../util/channel_api';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';

const receiveChannel = channel => (
    {
        type: RECEIVE_CHANNEL,
        channel
    }
)




export const fetchChannel = channel_id => dispatch => {
    return ChannelAPI.requestChannel(channel_id)
        .then(  channel => dispatch(receiveChannel(channel)),
                () => { console.log( "Channel does not exist.")}
        );
};

