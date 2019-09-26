class Api::VideoLikeDislikesController < ApplicationController
  def create
    @like_dislike = Like.create(
      user_id: current_user.id,
      likeable_id: s_params[:video_id],
      is_liked: bool(s_params[:bool]),
      likeable_type: Video.to_s,
    )

    if @like_dislike
      render :show
    else
      render json: ["Error"], status: 422
    end
  end

  def update
    @like_dislike = Like.find_by_id(params[:id])

    if @like_dislike.update(is_liked: params[:bool])
      render :show
    else
      render json: ["Error"], status: 422
    end
  end

  def destroy
    @like_dislike = Like.find_by_id(params[:id])
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
