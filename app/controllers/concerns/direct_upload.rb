module DirectUpload

  # method to create both blobs that are needed
  class DirectUpload
    def self.get_check_sum(entity)
      Digest::MD5.base64digest(File.read(entity.tempfile))
    end

    def self.create_blobs(valid_params)
      ActiveRecord::Base.transaction do
        thumbnail = valid_params[:thumbnail]
        video = valid_params[:file]
        metadata = { "identified" => true, "analyzed" => true }

        image_blob = ActiveStorage::Blob.create_before_direct_upload!(
          filename: thumbnail.original_filename,
          content_type: thumbnail.content_type,
          byte_size: thumbnail.size,
          checksum: self.get_check_sum(thumbnail),
          metadata: metadata,
        )

        video_blob = ActiveStorage::Blob.create_before_direct_upload!(
          filename: video.original_filename,
          content_type: video.content_type,
          byte_size: video.size,
          checksum: self.get_check_sum(video),
          metadata: metadata,
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
