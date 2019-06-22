class CreateVideoLikeDislike < ActiveRecord::Migration[5.2]
  def change
    create_table :video_like_dislikes do |t|
      t.integer :user_id, null: false
      t.integer :video_id, null: false
      t.boolean :category, null: false
      t.timestamps
    end
  end
end
