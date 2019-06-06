class RenameColumns < ActiveRecord::Migration[5.2]
  def change
    rename_column :video_dislikes, :type, :category
    rename_column :video_likes, :type, :category
  end
end
