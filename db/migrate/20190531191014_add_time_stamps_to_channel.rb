class AddTimeStampsToChannel < ActiveRecord::Migration[5.2]
  def change
    add_timestamps(:user_channels)
  end
end
