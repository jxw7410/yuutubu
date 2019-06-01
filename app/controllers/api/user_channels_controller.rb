class Api::UserChannelsController < ApplicationController
    def index 
    end

    def show
        @channel = UserChannel.find_by(id: params[:id])
        #debugger
        if @channel 
            render :show
        else 
            render json: ['Channel does not exist.'], status: 422 
        end
    end

    def create

    end

    private
    def user_channel_params   
        params.require(:user_channel).permit( :name, :user_id )
    end
end

