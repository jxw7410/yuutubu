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
#  duration    :float            not null
#  views       :integer          default(0)
#

class Video < ApplicationRecord
    validates :title, :description, :user_id, :channel_id, :duration, presence: true


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
    
    has_many :likes,
        primary_key: :id,
        foreign_key: :video_id,
        class_name: :VideoLike

    has_many :dislikes,
        primary_key: :id,
        foreign_key: :video_id,
        class_name: :VideoDislike

    has_many :like_by_users,
        through: :likes,
        source: :user

    has_many :dislike_by_users,
        through: :dislikes,
        source: :user

end

