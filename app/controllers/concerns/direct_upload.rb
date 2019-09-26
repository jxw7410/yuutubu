module DirectUpload

  # method to create both blobs that are needed
  class DirectUpload
    def self.create_blobs(valid_params)
      ActiveRecord::Base.transaction do
        image_blob = ActiveStorage::Blob.create_before_direct_upload!(
          filename: valid_params[:thumbnail].original_filename,
          content_type: valid_params[:thumbnail].content_type,
          byte_size: valid_params[:thumbnail].size,
          checksum: Digest::MD5.base64digest(File.read(valid_params[:thumbnail].tempfile)),
          metadata: { "identified" => true, "analyzed" => true },
        )

        video_blob = ActiveStorage::Blob.create_before_direct_upload!(
          filename: valid_params[:file].original_filename,
          content_type: valid_params[:file].content_type,
          byte_size: valid_params[:file].size,
          checksum: Digest::MD5.base64digest(File.read(valid_params[:file].tempfile)),
          metadata: { "identified" => true, "analyzed" => true },
        )

        return [image_blob, video_blob]
      end
    end

    def self.destroy_blobs(video_blob_id = nil, image_blob_id = nil)
      video_blob = ActiveStorage::Blob.find_by(id: video_blob_id)
      image_blob = ActiveStorage::Blob.find_by(id: image_blob_id)
      video_blob.destroy if video_blob
      image_blob.destroy if image_blob
    end

    def self.direct_upload_json(blob)
      blob.as_json(root: false, methods: :signed_id)
        .merge(direct_upload: {
                 url: blob.service_url_for_direct_upload,
                 headers: blob.service_headers_for_direct_upload,
               })
    end
  end
end
