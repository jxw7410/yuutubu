class CreateVideoPost < ActiveRecord::Migration[5.2]
  def change
    create_table :video_posts do |t|
      t.text :description, null: false
      t.integer :user_id, null: false
      t.integer :video_id, null: false 
      t.timestamps
    end
  end
end
