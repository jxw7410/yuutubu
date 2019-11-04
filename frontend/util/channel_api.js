export const requestChannel = channelId => {
  return $.ajax({
    url: `/api/user_channels/${channelId}`
  });
}


export const requestChannels = (offset, limit) => {
  return $.ajax({
    url: `/api/user_channels`,
    data: {
      offset,
      limit
    }
  })
}