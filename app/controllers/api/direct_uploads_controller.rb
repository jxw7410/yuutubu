class Api::DirectUploadsController < ApplicationController
    before_action :ensure_login

    def create 
        image_blob = ActiveStorage::Blob.create_before_direct_upload!(
            filename: valid_params[:thumbnail].original_filename,
            content_type: valid_params[:thumbnail].content_type,
            byte_size: valid_params[:thumbnail].size, 
            checksum: Digest::MD5.base64digest(File.read(valid_params[:thumbnail].tempfile)),
            metadata: {"identified"=>true, "analyzed"=>true}
        )
        
        video_blob = ActiveStorage::Blob.create_before_direct_upload!(
            filename: valid_params[:file].original_filename,
            content_type: valid_params[:file].content_type,
            byte_size: valid_params[:file].size,
            checksum: Digest::MD5.base64digest(File.read(valid_params[:file].tempfile)),
            metadata: {"identified"=>true, "analyzed"=>true}
        )
        
        if image_blob && video_blob
            render json: { image_blob: direct_upload_json(image_blob), video_blob: direct_upload_json(video_blob)}, status: 200
        else 
            image_blob.destroy if image_blob 
            video_blob.destroy if video_blob 
            render json: ['Request to Upload failed'], status: 422
        end
    end 


    def destroy
        video_blob = ActiveStorage::Blob.find_by(id: params[:blob_ids][:video_blob_id])
        image_blob = ActiveStorage::Blob.find_by(id: params[:blob_ids][:image_blob_id])
        video_blob.destroy 
        image_blob.destroy 
        
        render json: {}, status: 200
    end 


    private 
    def direct_upload_json(blob)
        blob.as_json(root: false, methods: :signed_id)
            .merge(direct_upload: {
            url: blob.service_url_for_direct_upload,
            headers: blob.service_headers_for_direct_upload})
    end


    def valid_params
        params.require(:video).permit(:file, :thumbnail, :blob_ids)
    end
end