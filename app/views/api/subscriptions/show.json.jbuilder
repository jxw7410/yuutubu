json.set! @subscription.id do 
    json.extract! @subscription, :id, :channel_id
    json.channelName @subscription.channel.name
end