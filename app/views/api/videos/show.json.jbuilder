json.extract! @video, :id, :title, :description, :user_id, :channel_id, :views, :duration
json.created_at @video.created_at.strftime("%B %d, %Y")
if @video.video_content.attached? 
    json.videoUrl  url_for(@video.video_content)  
end

json.likeCount @video.like_dislikes.where(category: true).count
json.dislikeCount @video.like_dislikes.where(category: false).count

if @like_dislike 
    json.like_dislike do 
        json.extract! @like_dislike, :id, :category
    end
end
