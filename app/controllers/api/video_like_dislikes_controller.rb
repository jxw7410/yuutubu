class Api::VideoLikeDislikesController < ApplicationController
    def create
        @like_dislike =  VideoLikeDislike.create(user_id: current_user.id, video_id: s_params[:video_id], category: bool(s_params[:bool]))
        if @like_dislike
            render :show
        else 
            render json: ['Error'], status: 422
        end
    end 

    def update
        @like_dislike = VideoLikeDislike.find_by_id(params[:id])
        
        if @like_dislike.update(category: params[:bool])
            render :show 
        else  
            render json: ['Error'], status: 422
        end
    end

    def destroy
        @like_dislike = VideoLikeDislike.find_by_id(params[:id])
        @like_dislike.destroy!
        render json: {}, status: 200       
    end


    private

    def s_params
        params.require(:video_like_dislike).permit(:id, :user_id, :video_id, :bool)
    end


    def bool(arg)
        ActiveModel::Type::Boolean.new.cast(arg)
    end
end
