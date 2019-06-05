class AddDurationColumnToVideo < ActiveRecord::Migration[5.2]
  def change
    add_column :videos, :duration, :float, null: false
  end
end
