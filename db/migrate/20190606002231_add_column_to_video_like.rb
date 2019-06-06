class AddColumnToVideoLike < ActiveRecord::Migration[5.2]
  def change
    add_column :video_dislikes, :type, :string, default: "DISLIKES"
  end
end
