class Api::VideosController < ApplicationController

    def index_search
        query = params[:query].downcase
        @videos = Video.joins(:channel).where("lower(title) like ? or lower(title) like ? or lower(title) like ? or 
            lower(description) like ? or lower(description) like ? or lower(description)like ? or
            lower(user_channels.name) like ? or lower(user_channels.name) like ?  or lower(user_channels.name) like ?",
            "#{query}%", "%#{query}%", "%#{query}",
            "#{query}%", "%#{query}%", "%#{query}",
            "#{query}%", "%#{query}%", "%#{query}")
            .order(:id)
            .limit(params[:limit])
            .offset(params[:offset]);


        if !@videos.empty?
            render :index_partial
        else  
            render json: {}, status: 404 
        end
    end

    def index_partial   
        @videos = Video.where(channel_id: params[:channel_id])
            .limit(params[:limit])
            .offset(params[:offset])
            .with_attached_thumbnail
            
        if @videos
            render :index_partial
        else 
            render json: ["Videos not found"], status: 422
        end
    end

    def index_recommended
        if params[:video_id]
            @videos = recommended_video_query(params[:video_id])
        else 
            @videos = recommended_video_query(nil)
        end 
             
        if @videos 
            render :index_partial
        else 
            render json: ["Videos not found"], status: 422
        end 
    end

    def update_views
        begin
            Video.find_by(id: params[:video_id]).increment!(:views)
            render json: {}, status: 200
        rescue
            return
        end
    end

    def create
        channel = current_user.user_channels.where(id: video_params[:channel_id]).first
        @video = Video.create(user_id: current_user.id, 
            title: video_params[:title],
            channel_id: channel.id,
            description: video_params[:description],
            duration: video_params[:duration])

        if @video
            begin
                @video.thumbnail.attach(video_params[:thumbnail])
                @video.video_content.attach(video_params[:file])
                render json: ['Video uploaded'], status: 200
            rescue
                @video.destroy
                render json: ['Video cannot be uploaded'], status: 422
            end            
        else 
            render json: ['Video cannot be uploaded'], status: 422
        end
    end

    def show
        @video = Video.where(id: params[:id])
            .includes(:likes)
            .first
            
        if @video
            if current_user  
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
        params.require(:video).permit(:title, :description, :channel_id, :duration, :file, :thumbnail)
    end

    def recommended_video_query(video_id)
        # remove_for_production
        limit = 12
        if video_id
            if login?
                videos = Video.where
                    .not(id: video_id, user_id: current_user.id)
                    .limit(limit)
                    .includes(:channel)
                    .order(:views)
            else 
                videos = Video.where
                    .not(id: video_id)
                    .limit(limit)
                    .includes(:channel)
                    .order(:views)
            end 
        else 
            if login? 
                videos = Video.all.limit(limit).not(user_id: current_user.id).includes(:channel).order(:views)
            else
                videos = Video.all.limit(limit).includes(:channel).order(:views)
            end
        end
        
        videos
    end
end


