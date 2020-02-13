json.extract! post, :id, :video_id, :user_id, :description
json.created_at post.created_at.strftime("%B %d, %Y")
json.user post.user.username