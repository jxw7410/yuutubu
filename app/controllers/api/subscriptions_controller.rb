class Api::SubscriptionsController < ApplicationController
    before_action :ensure_login
    def index
        if login? 
            @subscriptions = Subscription.where(subscriber_id: current_user.id).includes(:channel)
            if @subscriptions.length > 0 
                render :index
            else
                render json: {}, status: 200
            end
        else 
            render json: {}, status: 200
        end
    end

    def create 
        @subscription = Subscription.create(subscriber_id: current_user.id, channel_id: params[:channel_id])
        if @subscription
            @channel = UserChannel.where(id: params[:channel_id]).includes(:subscriptions).first
            render :show
        else 
            render json: @subscription.errors.full_messages, status: 422
        end
    end 

    def destroy 
        @subscription = Subscription.find_by(id: params[:id]).destroy
        if @subscription
            @channel = UserChannel.where(id: @subscription.channel_id).includes(:subscriptions).first
            render :show
        else 
            render json: ['No token!'], status: 404
        end
        
    end
end