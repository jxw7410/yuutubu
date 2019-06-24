# == Schema Information
#
# Table name: user_channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserChannel < ApplicationRecord
    validates :name, :user_id, presence: true


    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User  
    
    has_many :videos,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :Video

    has_many :subscriptions,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :Subscription

    has_many :subscribed, 
        source: :subscriptions,
        through: :subscriber


    #To be replaced by an association later in the future.
    def featured_video
        false
    end


end
