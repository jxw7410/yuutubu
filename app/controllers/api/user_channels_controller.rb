class Api::UserChannelsController < ApplicationController
  def index
    # if params[:user_id] is given, and is not an empty string
    # Fix this remove user_id from params from FE and BE
    if current_user
      @channels = UserChannel.where
        .not(user_id: current_user.id)
        .limit(params[:limit])
        .offset(params[:offset])
        .includes(:videos)
        .includes(:subscriptions)
    else
      @channels = UserChannel.all 
        .limit(params[:limit])
        .offset(params[:offset])
        .includes(:videos)
        .includes(:subscriptions)
    end

    unless @channels.empty?
      @current_user = current_user
      render :index
    else
      render json: ["Channels not found."], status: 404
    end
  end

  def show
    @channel = UserChannel.includes(:subscriptions).find(params[:id])

    if @channel
      @current_user = current_user
      render :show
    else
      render json: ["Channel does not exist."], status: 422
    end
  end
end
