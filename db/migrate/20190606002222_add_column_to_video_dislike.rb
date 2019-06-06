class AddColumnToVideoDislike < ActiveRecord::Migration[5.2]
  def change
    add_column :video_likes, :type, :string, default: "LIKES"
  end
end
