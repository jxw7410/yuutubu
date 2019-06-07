json.set! @post.id do 
    json.extract! @post, :id, :user_id, :video_id, :description
end


