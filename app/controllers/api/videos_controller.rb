class Api::VideosController < ApplicationController
    def index_lite
        #debugger
       
        @videos = Video.where(channel_id: params[:channel_id])
            .limit(params[:limit])
            .offset(params[:offset])
            .with_attached_thumbnail
        if @videos
            render :index_lite
        else 
            render json: ["Videos not found"], status: 422
        end
    end

    def show
        @video = Video.find_by(id: params[:id])
        #debugger 
        if @video 
            render :show 
        else 
            render json: ['Video is unavailable'], status: 422
        end
    end
end


