json.posts do
  @posts.each do |post|
    json.set! post.id do
      json.extract! post, :id, :video_id, :user_id, :description, :created_at
      json.created_at post.created_at.strftime("%B %d, %Y")
      json.user post.user.username
    end
  end
end

json.offset @posts.length
