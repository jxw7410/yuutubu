class Api::VideoPostsController < ApplicationController 
    before_action :ensure_login, only: [:create, :destroy]
    def index
        @posts = VideoPost.all.where(video_id: params[:video_id])
            .includes(:user)
            .limit(6)
            .order("created_at DESC")

        if @posts
            render :index
        else 
            render json: ["Posts are not found"], status: 404
        end
    end

    def index_partial
        @posts = VideoPost.all.where(video_id: params[:video_id])
            .includes(:user)
            .limit(params[:limit])
            .offset(params[:offset])
            .order("created_at DESC")
        # 
        if @posts.length > 0
            render :index
        else
            render json: ["Posts are not found"], status: 404
        end
    
    end

    def create
        @post = VideoPost.create(user_id: current_user.id, 
            video_id: post_params[:video_id], 
            description: post_params[:description])
        
        @user = current_user

        if @post
            render :show 
        else 
            render json: ['Post cannot be created.'], status: 422
        end
    end

    def destroy
        @post = VideoPost.find_by(id: params[:id]).destroy

        if @post 
            render :delete
        else 
            render json: ['Post failed to be destroyed'], status: 422
        end
    end


    private 
    def post_params
        params.require(:post).permit(:video_id, :user_id, :description)
    end
end