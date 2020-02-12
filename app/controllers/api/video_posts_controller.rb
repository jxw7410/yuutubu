class Api::VideoPostsController < ApplicationController
  before_action :ensure_login, only: [:create, :destroy, :update]

  def index
    @posts = VideoPost.index(params[:video_id], params[:limit], params[:offset]);
    if !@posts.empty?
      render :index
    else
      render json: ["Posts are not found"], status: 404
    end
  end

  def index_replies
    @post = VideoPost.find_by_id(params[:id])
  end

  def create
    new_params = post_params.merge(user_id: current_user.id)
    @post = VideoPost.create(new_params)
    @user = current_user
    if @post
      render :show
    else
      render json: ["Post cannot be created."], status: 422
    end
  end

  def update 
    @post = VideoPost.find_by_id(params[:id]);
    @user = current_user
    if @post.update(description: post_params[:description])
      render :show
    else 
      render json: ["Post cannot be updated"], status: 422
    end
  end

  def destroy
    @post = VideoPost.find_by(id: params[:id]).destroy
    if @post
      render :delete
    else
      render json: ["Post failed to be destroyed"], status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:video_id, :description)
  end
end
