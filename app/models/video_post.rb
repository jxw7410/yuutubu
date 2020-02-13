# == Schema Information
#
# Table name: video_posts
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  user_id     :integer          not null
#  video_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  parent_id   :integer
#

class VideoPost < ApplicationRecord
  validates :description, :user_id, :video_id, presence: true

  belongs_to :user,
             primary_key: :id,
             foreign_key: :user_id,
             class_name: :User

  belongs_to :video,
             primary_key: :id,
             foreign_key: :video_id,
             class_name: :Video

  belongs_to :parent_post,
           primary_key: :id,
           foreign_key: :parent_id,
           class_name: :VideoPost,
           optional: true

  has_many :replies,
    primary_key: :id,
    foreign_key: :parent_id,
    class_name: :VideoPost,
    dependent: :destroy

  def self.index(video_id=nil, limit=0, offset=0)
    self.where(video_id: video_id, parent_id: nil)
      .includes(:user)
      .includes(:replies)
      .limit(limit)
      .offset(offset)
      .order("created_at DESC")
  end

end
