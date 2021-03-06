# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, presence: true
  validates :email, :password_digest, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  attr_reader :password
  after_initialize :ensure_session

  has_many :user_channels,
           primary_key: :id,
           foreign_key: :user_id,
           class_name: :UserChannel,
           dependent: :destroy

  has_many :subscriptions,
           primary_key: :id,
           foreign_key: :subscriber_id,
           class_name: :Subscriptions,
           dependent: :destroy

  has_many :subscribed,
           through: :subscriptions,
           source: :channel,
           dependent: :destroy

  has_many :video_likes_dislikes,
           primary_key: :id,
           foreign_key: :user_id,
           class_name: :Like,
           dependent: :destroy

  has_many :liked_disliked_videos,
           through: :video_likes_dislikes,
           source_type: "Video",
           source: :likeable,
           dependent: :destroy

  has_many :video_posts,
           primary_key: :id,
           foreign_key: :user_id,
           class_name: :VideoPost,
           dependent: :destroy

  has_many :posts_in_video,
           through: :video_posts,
           source: :video,
           dependent: :destroy

  has_many :searches,
           primary_key: :id,
           foreign_key: :user_id,
           class_name: :SearchHistory,
           dependent: :destroy

  def self.verify_email(email)
    User.find_by_email(email)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email.downcase)
    return unless user
    return user if user.is_password?(password)
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
end
