# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  user_id       :integer          not null
#  is_liked      :boolean          not null
#  likeable_type :string
#  likeable_id   :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Like < ApplicationRecord
    validates :user_id, :likeable_id, :likeable_type, presence: true
    validates :user_id, uniqueness: {scope: [:likeable]}
    validates :is_liked, inclusion: {in: [true, false]} 

    belongs_to :user
    belongs_to :likeable, polymorphic: true
end
