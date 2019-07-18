class DropVideoLikesDislikes < ActiveRecord::Migration[5.2]
  def change
    drop_table :video_like_dislikes
  end
end
