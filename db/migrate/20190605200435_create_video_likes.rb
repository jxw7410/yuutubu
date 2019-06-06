class CreateVideoLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :video_likes do |t|
      t.integer :user_id, null: false
      t.integer :video_id, null: false
      t.index([:user_id, :video_id], unique: true)
      t.timestamps
    end

    add_index :video_likes, :user_id
    add_index :video_likes, :video_id
  end
end
