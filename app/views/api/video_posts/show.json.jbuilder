json.set! @post.id do
  json.partial! "api/video_posts/show", post: @post
end
