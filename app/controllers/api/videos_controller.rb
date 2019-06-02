class Api::VideosController < ApplicationController
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



