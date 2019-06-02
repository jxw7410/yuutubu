class Api::UserChannelsController < ApplicationController
    def index 
        if params[:user_id].length > 0
            @channels = UserChannel.where
                .not(user_id: params[:user_id])
                .limit(params[:limit])
                .offset(params[:offset])
        else
            @channels = UserChannel.all
                .limit(params[:limit])
                .offset(params[:offset])
        end


        if @channels.empty?
            render json: ["Channels not found."], status: 404
        else 
            render :index
        end
    end

    def show
        @channel = UserChannel.find_by(id: params[:id])
        if @channel 
            render :show
        else 
            render json: ['Channel does not exist.'], status: 422 
        end
    end

    def create
        render json: ['Unavailable at this time.'], status: 422
    end

    private
    def user_channel_params   
        params.require(:user_channel).permit( :name, :user_id )
    end
end

