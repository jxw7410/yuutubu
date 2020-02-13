class AddParentIdToVideoPost < ActiveRecord::Migration[5.2]
  def change
    add_column :video_posts, :parent_id, :integer
  end
end
