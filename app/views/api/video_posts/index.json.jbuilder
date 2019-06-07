json.posts do 
    @posts.each do |post|
        json.set! post.id do 
            json.extract! post, :id, :video_id, :user_id, :description
        end
    end
end

json.offset @posts.length

