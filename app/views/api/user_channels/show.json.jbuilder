json.extract! @channel, :id, :user_id, :name
json.subscriptionCount @channel.subscriptions.count
if @current_user
  if @channel.subscriptions.find_by_subscriber_id(@current_user.id)
    json.subbed true
  else
    json.subbed false
  end
end
