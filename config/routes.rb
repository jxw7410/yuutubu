
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  namespace :api,  defaults: {format: 'json'} do
    resources :users, only: [:create]
      
    resource :session, only: [:create, :destroy]
    # Should be a get request due to the intention
    # But get request params are in URL, and forbids extensions like '.com'
    post '/session/email', to: 'sessions#email'

    resources :user_channels, only: [:index, :show]
      
    resources :videos, only: [:show, :create]
    patch '/videos/:video_id/views', to: "videos#update_views"
    # These are made they are because index by default does not expect url params.
    # Like a mix of show and index
    get '/videos/channel/:channel_id', to: 'videos#index_by_channel'
    get '/videos/recommend/:video_id', to: 'videos#index_by_recommend'
    get '/videos/search/:query', to: 'videos#index_by_search'

    resources :video_posts, only: [:create, :destroy]
    get '/video_posts/video/:video_id', to: 'video_posts#index_by_video'


    resources :searches, only: [:create]
    get '/searches/search_bar/:query', to: 'searches#index_by_history_title'
    get '/searches/search_bar', to: 'searches#index_by_history'


    resources :subscriptions, only: [:create, :destroy, :index]
    resources :video_like_dislikes, only: [:create, :destroy, :update]
    resource :direct_upload, only: [:create, :destroy]
      
  end


end
