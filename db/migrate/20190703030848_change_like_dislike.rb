class ChangeLikeDislike < ActiveRecord::Migration[5.2]
  def change
    drop_table :video_dislikes
    drop_table :video_likes
    add_index :video_like_dislikes, :user_id
    add_index :video_like_dislikes, :video_id
    add_index :video_like_dislikes, [:user_id, :video_id], unique: true
  end
end
