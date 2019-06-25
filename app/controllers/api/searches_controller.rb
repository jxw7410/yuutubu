class Api::SearchesController < ApplicationController
    before_action :ensure_login, only: [:create]
    
    def index
    end 

    def index_history
        if login?
            limit = 8
            @histories = SearchHistory.where(user_id: current_user.id)
                .limit(limit)
                .order(updated_at: :desc)
            
            if @histories.length > 0
                    render :index_history_title
            else  
                    render json: {}, status: 200
            end
        else 
            render json: {}, status: 200
        end
    end

    def index_history_title
        if params[:query]
            limit = 8 
            
            if login?
                @histories = SearchHistory.where("user_id = ? and context LIKE ?", current_user.id, "#{params[:query].downcase}%")
                    .limit(limit)
            end
            
            @videos = Video.joins(:channel).where("lower(title) LIKE ? or lower(user_channels.name) LIKE ?", "#{params[:query].downcase}%", "#{params[:query].downcase}%")
                .limit(limit)
                .select(:title, :name)
            
            #debugger
            if @videos.length > 0
                render :index_history_title
            else  
                render json: {}, status: 200
            end
        else 
            render json: {}, status: 404
        end
    end

    def create 
        @search_phrase = SearchHistory.where("user_id = ? and context = ?", current_user.id, params[:query].downcase).first
        if @search_phrase
            @search_phrase.touch
            render :show
        else 
            @search_phrase = SearchHistory.create(user_id: current_user.id, context: params[:query].downcase)
            if @search_phrase 
                render :show 
            else
                render json: @search_phrase.errors.full_messages, status: 422  
            end
        end
    end

    def destroy

    end
end