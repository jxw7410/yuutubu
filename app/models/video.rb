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
    include Likeable
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


    has_many :video_posts,
        primary_key: :id,
        foreign_key: :video_id

    has_many :video_post_posters,
        through: :video_posts,
        source: :user


    def self.query_by_string(query, limit = nil, offset = nil)
        query = query.downcase

        self.joins(:channel).where("lower(title) like ? 
            or lower(title) like ? 
            or lower(title) like ? 
            or lower(description) like ? 
            or lower(description) like ? 
            or lower(description)like ? 
            or lower(user_channels.name) like ? 
            or lower(user_channels.name) like ?  
            or lower(user_channels.name) like ?",
            "#{query}%", "%#{query}%", "%#{query}",
            "#{query}%", "%#{query}%", "%#{query}",
            "#{query}%", "%#{query}%", "%#{query}")
            .limit(limit)
            .offset(offset);
    end

    def self.find_by_video_id(id = nil, user_id = nil)
        # remove_for_production
        # hardcorded limit
        limit = 12
        if id 
            return self.where.not(id: id, user_id: user_id)
                    .limit(limit)
                    .includes(:channel)
                    .order(:views)
        else 
            return self.where.not(user_id: user_id)
                    .includes(:channel)
                    .order(:views)
        end
    end
end

