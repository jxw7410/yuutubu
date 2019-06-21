class Api::SearchesController < ApplicationController
    def index
        # @videos = Vide0.where('lower(title) LIKE ?', "#{params[:query].downcase}%")
        #     .where('lower(title) LIKE ?')
    end 

    def index_history
        @videos = Video.all.limit(6).order(views: :desc)
         if @videos.length > 0
                render :index_history_title
        else  
                render json: {}, status: 200
        end
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
        @search_phrase = SearchHistory.create(params[:context])
        if @search_phrase 
            render :show 
        else
            render json: @search_phrase.errors.full_messages, status: 422  
        end
    end

    def destroy

    end
end