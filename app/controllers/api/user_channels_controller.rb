class UserChannelsController < ApplicationController
    def index
        
    end

    def show
        
    end

    def create

    end

    private
    def user_channel_params   
        params.require(:user_channel).permit( :name, :user_id )
    end
end

