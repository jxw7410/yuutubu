import * as ChannelAPI from '../../util/channel_api';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const CLEAR_CHANNELS = 'CLEAR_CHANNELS';

const receiveChannel = channel => ({
        type: RECEIVE_CHANNEL,
        channel
})


const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels
});


export const clearChannels = () => ({
    type: CLEAR_CHANNELS
});

export const fetchChannel = channel_id => dispatch => {
    return ChannelAPI.requestChannel(channel_id)
        .then(  channel => dispatch(receiveChannel(channel)),
                () => { console.log( "Channel does not exist.")}
        );
};

export const fetchChannels = (offset, limit, user_id) => dispatch => {
    return ChannelAPI.requestChannels(offset, limit, user_id)
        .then( channels => {
            dispatch(receiveChannels(channels)
        )});
}


