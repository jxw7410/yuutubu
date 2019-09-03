class Api::VideosController < ApplicationController
    def index_by_search
        @videos = Video.query_by_string(
            params[:query],
            params[:limit],
            params[:offset]
        )

        if !@videos.empty?
            render :index
        else  
            render json: {}, status: 404
        end
    end

    def index_by_channel
        @videos = Video.where(channel_id: params[:channel_id])
            .limit(params[:limit])
            .offset(params[:offset])
            .with_attached_thumbnail

        if @videos
            render :index
        else 
            render json: ["Videos not found"], status: 422
        end
    end

    def index_by_recommend
        if login?
            @videos = Video.find_by_video_id(params[:video_id], current_user.id)
        else 
            @videos = Video.find_by_video_id(params[:video_id])
        end

        if @videos 
            render :index
        else 
            render json: ["Videos not found"], status: 422
        end 
    end

    def update_views
        Video.find_by(id: params[:video_id]).increment!(:views)
        render json: {}, status: 200
    end

    def create
        channel = current_user.user_channels.first

        # Wrap around a transaction.
        
        @video = Video.create(
            user_id: current_user.id, 
            title: video_params[:title],
            channel_id: channel.id,
            description: video_params[:description],
            duration: video_params[:duration]
        )

        @video_attachment = ActiveStorage::Attachment.create(
            name: 'video_content',
            record_type: 'Video',
            record_id: @video.id,
            blob_id: video_params[:video_id]
        )

        @thumbnail_attachment = ActiveStorage::Attachment.create(
            name: 'thumbnail',
            record_type: 'Video',
            record_id: @video.id,
            blob_id: video_params[:thumbnail_id]
        )
        
        if @video && @video_attachment && @thumbnail_attachment
            render json: {}, status: 200
        else 
            render json: ['Upload failed!'], status: 422 
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
                @like_dislike = nil;
            end

            render :show 
        else 
            render json: ['Video is unavailable'], status: 422
        end
    end


    private 

    def video_params 
        params.require(:video).permit(
            :title, 
            :description, 
            :channel_id, 
            :duration, 
            :video_id,
            :thumbnail_id
        )
    end
end


