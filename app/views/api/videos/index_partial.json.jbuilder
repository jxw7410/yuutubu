@videos.each do |video|
    #debugger
    json.set! video.id do
        json.extract! video, :id, :title, :description, :user_id, :channel_id, :views, :duration
        json.created_at video.created_at.strftime("%B %d, %Y")
        json.channelName video.channel.name
        if video.thumbnail.attached? 
            json.thumbnail url_for(video.thumbnail)
        else 
            json.thumbnail image_url('YouTube-icon-our_icon.png')
        end
    end
end     