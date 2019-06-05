json.extract! @video, :id, :title, :description, :user_id, :channel_id, :created_at
if @video.video_content.attached? 
    json.videoUrl  url_for(@video.video_content)  
end

#commented out to avoid needless querying from aws
#works tho