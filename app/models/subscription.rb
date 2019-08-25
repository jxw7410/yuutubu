# == Schema Information
#
# Table name: subscriptions
#
#  id            :bigint           not null, primary key
#  subscriber_id :integer          not null
#  channel_id    :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Subscription < ApplicationRecord
    validates :channel_id, :subscriber_id, presence: true
    validate :prevent_self_subscription, on: :create

    belongs_to :subscriber,
        primary_key: :id,
        foreign_key: :subscriber_id,
        class_name: :User 
    
    belongs_to  :channel,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :UserChannel

    
    private
    #Custom validation to eliminate subscription to one's self (how)?
    def prevent_self_subscription
        channel = UserChannel.where(user_id: subscriber_id).first
        errors.add(:subscriber_id, "Cannot subscribe to your own channel") if channel.id == channel_id    
    end
end
