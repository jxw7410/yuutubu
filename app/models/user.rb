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
    validates :password, length: { minimum: 6}, allow_nil: true

    attr_reader :password
    after_initialize :ensure_session

    has_many :user_channels,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :UserChannel 
         
    has_many :likes,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :VideoLike

    has_many :dislikes,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :VideoDislike

    has_many :like_videos,
        through: :likes,
        source: :video

    has_many :dislike_videos,
        through: :dislikes,
        source: :video

    def self.verify_email(email)
        User.find_by_email(email)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by_email(email)
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
