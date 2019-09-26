@channels.each do |channel|
  if !channel.videos.empty?
    json.set! channel.id do
      json.extract! channel, :id, :name, :user_id
      json.subscriptionCount channel.subscriptions.count
      if @current_user
        if channel.subscriptions.find_by_subscriber_id(@current_user.id)
          json.subbed true
        else
          json.subbed false
        end
      end
      json.video_ids do
        json.array! channel.videos, :id
      end
    end
  end
end
