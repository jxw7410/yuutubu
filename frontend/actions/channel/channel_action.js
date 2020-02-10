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

export const fetchChannel = channelId => dispatch => {
  return ChannelAPI.requestChannel(channelId)
    .then(channel => dispatch(receiveChannel(channel)));
};

export const fetchChannels = (offset, limit) => dispatch => {
  return ChannelAPI.requestChannels(offset, limit)
    .then(channels => dispatch(receiveChannels(channels)));
}


