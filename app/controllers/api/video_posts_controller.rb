class Api::VideoPostsController < ApplicationController 
    before_action :ensure_login, only: [:create, :destroy]
    def index
        #debugger
        @posts = VideoPost.all.where(video_id: params[:video_id]).limit(10)
        #debugger
        if @posts
            render :index
        else 
            render json: ["Posts are not found"], status: 404
        end
    end

    def index_partial
        debugger
    end

    def create
        @post = VideoPost.create(user_id: current_user.id, 
            video_id: post_params[:video_id], 
            description: post_params[:description])


        if @post
            render :show 
        else 
            render json: ['Post cannot be created.'], status: 422
        end
    end

    def destroy
        debugger
    end


    private 
    def post_params
        params.require(:post).permit(:video_id, :user_id, :description)
    end
end