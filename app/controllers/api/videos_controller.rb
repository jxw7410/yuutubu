class Api::VideosController < ApplicationController
  include DirectUpload
  
  def index
    if params.has_key?(:user_channel_id)
      @videos = Video.where(channel_id: params[:user_channel_id])
        .limit(params[:limit])
        .offset(params[:offset])
        .includes(:channel)
        .with_attached_thumbnail
      render_index
    elsif params.has_key?(:search_query)
      @videos = Video.query_by_string(
        params[:search_query],
        params[:limit],
        params[:offset]
      )
      render_index
    else
      render json: ["No parent token"], status: 422
    end
  end

  def recommend
    @videos = Video.find_by_video_id(
      params[:id],
      login? ? current_user.id : nil
    )
    if @videos
      render :index
    else
      render json: ["Videos not found"], status: 404
    end
  end

  def update_views
    Video.find_by(id: params[:id]).increment!(:views)
  end

  def create
    # Not using user channel since I want to eager load user_channel as well
    user = User.includes(:user_channels).find_by_session_token(session[:session_token])
    begin
      # create video is a transaction, so if it fails, it will raise an error, and a rollback would occur
      Video.create_video(user, video_params)
    rescue
      DirectUpload.destroy_blobs(video_params[:video_id], video_params[:thumbnail_id])
      render json: ["Upload failed!"], status: 422
    end
  end

  def show
    @video = Video.where(id: params[:id]).includes(:likes).first

    if @video
      if login?
        @like_dislike = @video.likes
          .where(user_id: current_user.id)
          .first
      else
        @like_dislike = nil
      end
      render :show
    else
      render json: ["Video is unavailable"], status: 422
    end
  end

  private

  def video_params
    params.require(:video).permit(
      :title,
      :description,
      :duration,
      :video_id,
      :thumbnail_id
    )
  end

  def render_index
    if @videos
      render :index
    else
      render json: ["Videos not found"], status: 404
    end
  end
end
