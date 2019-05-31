class CreateUserChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :user_channels do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
    end

    add_index :user_channels, :user_id
  end
end
