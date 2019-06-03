json.extract! @video, :id, :title, :description, :user_id, :channel_id, :created_at
#json.videoUrl  url_for(@video.video_content)    
#commented out to avoid needless querying from aws
#works tho