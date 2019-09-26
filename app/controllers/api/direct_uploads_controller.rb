class Api::DirectUploadsController < ApplicationController
  before_action :ensure_login
  include DirectUpload

  def create
    begin 
      image_blob, video_blob = DirectUpload.create_blobs(valid_params)
      render json: { 
        image_blob: DirectUpload.direct_upload_json(image_blob), 
        video_blob: DirectUpload.direct_upload_json(video_blob) 
        }, status: 200
    rescue 
      render json: ["Request to Upload failed"], status: 422
    end 

  end

  def destroy
    DirectUpload.destroy_blobs(
      params[:blob_ids][:video_blob_id], 
      params[:blob_ids][:image_blob_id]
    )
  end

  private

  def valid_params
    params.require(:video).permit(:file, :thumbnail, :blob_ids)
  end
end
