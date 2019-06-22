# == Schema Information
#
# Table name: search_histories
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  context    :string           not null
#  category   :string           default("SEARCH_HISTORY")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class SearchHistory < ApplicationRecord
    validates :user_id, :context, presence: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User 
    

    
end
