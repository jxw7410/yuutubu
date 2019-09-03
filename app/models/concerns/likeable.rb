# This concerns extends the functionality 
# of classes that are associated with the polymorphic table

module Likeable
    extend ActiveSupport::Concern

    included do 
        has_many :likes, as: :likeable
        has_many :like_dislikers, 
            through: :likes,
            source: :user 
    end

    def get_total_likes
        self.likes.where(is_liked: true).size
    end

    def get_total_dislikes
        self.likes.where(is_liked: false).size
    end
end