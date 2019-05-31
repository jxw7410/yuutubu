# == Schema Information
#
# Table name: user_channels
#
#  id      :bigint           not null, primary key
#  name    :string           not null
#  user_id :integer          not null
#

class UserChannel < ApplicationRecord
    validates :name, :user_id, presence: true


    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User  
    
end
