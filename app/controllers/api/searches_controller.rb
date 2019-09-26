class Api::SearchesController < ApplicationController
  before_action :ensure_login, only: [:create]

  # default to search by history only if user is logged in
  def history
    if login? 
      @histories = SearchHistory.where(
        user_id: current_user.id 
      ).limit(LIMIT)
      .order(updated_at: :desc)
      
      render :index
    else 
      render json: {}, status: 200
    end
  end 


  def search_titles
    if params.has_key?(:query) && !params[:query].empty?
      query = params[:query].downcase
      if login?
        @histories = SearchHistory.where(
          "user_id = ? and context LIKE ?",
          current_user.id,
          "#{query}%"
        ).limit(LIMIT)
      end

      @videos = Video.joins(:channel)
        .where(
          "lower(title) LIKE ? or lower(user_channels.name) LIKE ?",
          "#{query}%",
          "#{query}%"
        ).limit(LIMIT)
        .select(:id, :title, :name)
    end

    render :index
  end

  def create
    @search_phrase = SearchHistory.where(
      "user_id = ? and context = ?",
      current_user.id, params[:query].downcase
    ).first

    if @search_phrase
      @search_phrase.touch
      render :show
    else
      @search_phrase = SearchHistory.create(
        user_id: current_user.id,
        context: params[:query].downcase,
      )

      if @search_phrase
        render :show
      else
        render json: @search_phrase.errors.full_messages, status: 422
      end
    end
  end

  private 
  #limit for query; used in all the methods, relative to this class.
  LIMIT = 8

end
