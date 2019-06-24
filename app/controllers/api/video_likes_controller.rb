class Api::VideoLikesController < ApplicationController
    before_action :ensure_login

    def create_like   
        @like = VideoLike.create(user_id: current_user.id, video_id: params[:video_id])
        if @like
            render :like
        else 
            render json: ['Error'], status: 422
        end 
    end


    def delete_like
        like = VideoLike.find_by(id: params[:like_id]).destroy!
        if like 
            render json: {}, status: 200
        else 
            render json: {}, status: 422
        end
    end

    def create_dislike
        @like = VideoDislike.create(user_id: current_user.id, video_id: params[:video_id])
        if @like
            render :like
        else  
            render json: ['Error'], status: 422
        end 
    end 

    def delete_dislike
        dislike = VideoDislike.find_by(id: params[:dislike_id]).destroy!
        if dislike 
            render json: {}, status: 200
        else 
            render json: {}, status: 422
        end
    end 


    def create_like_destroy_dislike
        like = VideoDislike.find_by(id: params[:dislike_id]).destroy!
        @like = VideoLike.create(user_id: current_user.id, video_id: params[:video_id])        

        if like && @like 
            render :like
        else 
            render json: {}, status: 422
        end

    end 

    def create_dislike_destroy_like 
         like = VideoLike.find_by(id: params[:like_id]).destroy!
        @like = VideoDislike.create(user_id: current_user.id, video_id: params[:video_id])        

        if like && @like 
            render :like
        else 
            render json: {}, status: 422
        end

    end

end