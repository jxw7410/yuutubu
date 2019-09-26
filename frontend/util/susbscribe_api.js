export const fetchSubscriptions = () => {
  return $.ajax({
    url: 'api/subscriptions',
  })
}


export const updateSubscription = channel_id => {
  return $.ajax({
    method: 'post',
    url: 'api/subscriptions',
    data: { channel_id }
  })
}

export const deleteSubscription = id => {
  return $.ajax({
    method: 'delete',
    url: `api/subscriptions/${id}`
  })
}