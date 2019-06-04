@videos.each do |video|
    json.set! video.id do
        json.extract! video, :id, :title, :description, :user_id, :channel_id, :created_at
        if video.thumbnail.attached? 
            json.thumbnail url_for(video.thumbnail)
        else 
            json.thumbnail image_url('YouTube-icon-our_icon.png')
        end
    end
end