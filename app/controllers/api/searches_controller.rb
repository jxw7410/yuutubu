class Api::SearchesController < ApplicationController
    def index
    end 

    def index_history
        render json: {}, status: 200
    end

    def index_history_title
        if params[:query]
            @videos = Video.where("lower(title) LIKE ?", "#{params[:query].downcase}%")
    
            if @videos.length > 0
                render :index_history_title
            else  
                render json: {}, status: 200
            end
        else 
            render json: {}, status: 200
        end
    end

    def create 

    end

    def destroy

    end
end