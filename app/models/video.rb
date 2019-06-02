# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text             not null
#  user_id     :integer          not null
#  channel_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Video < ApplicationRecord
    validates :title, :description, :user_id, :channel_id, presence: true


    has_one_attached :thumbnail
    has_one_attached :video_content

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
    

    belongs_to :channel,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :UserChannel
    
    
end

