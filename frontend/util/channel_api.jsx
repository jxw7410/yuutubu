export const requestChannel = channel_id => {
    return $.ajax({
        url: `/api/user_channels/${channel_id}`
    });
}


