@videos.each do |video|
    #debugger
    json.set! video.id do
        json.extract! video, :id, :title, :description, :user_id, :channel_id, :created_at, :views, :duration
        json.channelName video.channel.name
        if video.thumbnail.attached? 
            json.thumbnail url_for(video.thumbnail)
        else 
            json.thumbnail image_url('YouTube-icon-our_icon.png')
        end
    end
end     