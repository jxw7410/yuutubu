export const requestChannel = channel_id => {
    return $.ajax({
        url: `/api/user_channels/${channel_id}`
    });
}


export const requestChannels = (offset, limit, user_id) =>{
    return $.ajax({
        url: `/api/user_channels`,
        data:{
            offset,
            limit,
            user_id
        }
    })
}