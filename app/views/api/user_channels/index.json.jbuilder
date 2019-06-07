@channels.each do |channel|
    if channel.videos.length > 0
        json.set! channel.id do 
            json.extract! channel, :id, :name, :user_id
            json.video_ids do 
                json.array! channel.videos, :id
            end
        end
    end
end

