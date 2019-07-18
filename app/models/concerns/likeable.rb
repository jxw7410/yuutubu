module Likeable
    extend ActiveSupport::Concern

    included do 
        has_many :likes, as: :likeable
        has_many :like_dislikers, 
            through: :likes,
            source: :user 
    end

    def get_total_likes
        self.likes.where(is_liked: true).count 
    end

    def get_total_dislikes
        self.likes.where(is_liked: false).count
    end
end