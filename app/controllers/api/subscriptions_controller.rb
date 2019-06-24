class SubscriptionsController < ApplicationController
    before_action :ensure_login
    def index
    end

    def create 
        @subscription = Subscription.create(subscriber_id: current_user.id, channel_id: params[:channel_id])
        if @subscription
            render :show
        else 
            render json: @subscription.errors.full_messages, status: 422
        end
    end 

    def destroy 
        @subscription = Subscription.find_by(id: params[:id])
        if @subscription
            @subscription.destroy
            render json: ['Deleted'], status: 200
        else 
            render json: ['No token!'], status: 404
        end
        
    end
end