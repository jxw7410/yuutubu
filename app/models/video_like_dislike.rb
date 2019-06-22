# == Schema Information
#
# Table name: video_like_dislikes
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  video_id   :integer          not null
#  category   :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class VideoLikeDislike < ApplicationRecord
end
