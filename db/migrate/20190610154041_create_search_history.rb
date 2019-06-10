class CreateSearchHistory < ActiveRecord::Migration[5.2]
  def change
    create_table :search_histories do |t|
      t.integer :user_id, null: false
      t.string :context, null: false
      t.string :category, default: 'SEARCH_HISTORY'
      t.timestamps 
    end

    add_index :search_histories, :user_id
  end
end
