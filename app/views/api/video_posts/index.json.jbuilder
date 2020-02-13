@posts.each do |post|
  json.set! post.id do
    json.partial! 'api/video_posts/show', post: post
    json.repliesCount post.replies.count
  end
end
