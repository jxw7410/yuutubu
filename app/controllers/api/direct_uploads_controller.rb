class DirectUploadsController < ApplicationController
    before_action :ensure_login


    def create 
        blob = ActiveStorage::Blob.create_before_direct_upload!(
            filename: video_params[:file].original_filename,
            content_type: video_params[:file].content_type,
            byte_size: video_params[:file].size,
            checksum: Digest::MD5.base64digest(File.read(video_params[:file].tempfile)),
            metadata: {"identified"=>true, "analyzed"=>true}
        )
        
        render json: direct_upload_json(blob), status: 200
    end 


    def delete 

    end


    private 
    def direct_upload_json(blob)
        blob.as_json(root: false, methods: :signed_id)
            .merge(direct_upload: {
            url: blob.service_url_for_direct_upload,
            headers: blob.service_headers_for_direct_upload})
    end
end