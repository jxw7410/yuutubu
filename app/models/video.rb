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

  def self.create_video(user, video_params)
    self.transaction do
      video = self.create!(
        user_id: user.id,
        title: video_params[:title],
        channel_id: user.user_channels.first.id,
        description: video_params[:description],
        duration: video_params[:duration],
      )

      # In case of confusion, the video_id refers the blob id created prior to the direct upload
      # same with the thumbnail.
      video_attachment = ActiveStorage::Attachment.create!(
        name: "video_content",
        record_type: "Video",
        record_id: video.id,
        blob_id: video_params[:video_id],
      )

      thumbnail_attachment = ActiveStorage::Attachment.create!(
        name: "thumbnail",
        record_type: "Video",
        record_id: video.id,
        blob_id: video_params[:thumbnail_id],
      )

      return [video, video_attachment, thumbnail_attachment]
    end
  end

  def self.query_by_string(params)
    query = params[:search_query].downcase
    self.joins(:channel).where(
      "lower(title) like ? 
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
      "#{query}%", "%#{query}%", "%#{query}"
    ).limit(params[:limit]).offset(params[:offset])
  end

  def self.find_by_video_id(id = nil, user_id = nil)
    if id
      return self.where.not(id: id, user_id: user_id)
               .limit(VIDEO_LIMIT)
               .includes(:channel)
               .order(views: :desc)
    else
      return self.where.not(user_id: user_id)
               .limit(VIDEO_LIMIT)
               .includes(:channel)
               .order(views: :desc)
    end
  end

  def self.find_videos_by_channel(params)
    self.where(channel_id: params[:user_channel_id])
      .order(id: :asc)
      .limit(params[:limit])
      .offset(params[:offset])
      .includes(:channel)
      .with_attached_thumbnail
  end

  private

  # Hardcoded video limit
  VIDEO_LIMIT = 12
end
