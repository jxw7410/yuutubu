# == Schema Information
#
# Table name: video_dislikes
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  video_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  category   :string           default("DISLIKES")
#

class VideoDislike < ApplicationRecord
    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
    
        
    belongs_to :video,
        primary_key: :id,
        foreign_key: :video_id,
        class_name: :Video
end
