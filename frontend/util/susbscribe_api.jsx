export const fetchSubscription = data => {
    return $.ajax({
        url: 'api/subscriptions',
        data
    })
}


export const updateSubscription = channel_id => {
    return $.ajax({
        method: 'post',
        url: 'api/subscriptions',
        data: {channel_id}
    })
}

export const deleteSubscription = id =>{
    return $.ajax({
        method: 'delete',
        url: `api/subscription/${id}`
    })
}