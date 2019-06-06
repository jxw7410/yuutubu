json.extract! @video, :id, :title, :description, :user_id, :channel_id, :created_at, :views, :duration
if @video.video_content.attached? 
    json.videoUrl  url_for(@video.video_content)  
end
json.likeCount @video.likes.count
json.dislikeCount @video.dislikes.count

if @like_dislike 
    json.like_dislike do 
        json.extract! @like_dislike, :id, :category
    end
end
