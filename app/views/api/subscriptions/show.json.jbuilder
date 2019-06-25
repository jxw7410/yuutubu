
json.extract! @subscription, :id, :channel_id
json.channelName @channel.name 
json.subscriptionCount @channel.subscriptions.count
