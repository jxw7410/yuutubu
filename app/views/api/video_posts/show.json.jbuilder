json.set! @post.id do 
    json.extract! @post, :id, :user_id, :video_id, :description
    json.created_at @post.created_at.strftime("%B %d, %Y")
    json.user @user.username
end


