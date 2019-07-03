Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  namespace :api,  defaults: {format: 'json'} do
      resources :users, only: [:create]
      
      resource :session, only: [:create, :destroy]
      post '/session/email', to: 'sessions#email'

      resources :user_channels, only: [:create, :index, :show]
      
      resources :videos, only: [:show, :create]
      get '/videos/index_partial/:channel_id', to: 'videos#index_partial'
      get '/videos/index_recommended/:video_id', to: 'videos#index_recommended'
      get '/videos/index_search/:query', to: 'videos#index_search'
      patch '/videos/:video_id/views', to: "videos#update_views"

      resources :video_posts, only: [:create, :destroy, :index]
      get '/video_posts/index_partial/:video_id', to: 'video_posts#index_partial'


      resources :searches, only: [:create, :destroy]
      get '/searches/search_bar/:query', to: 'searches#index_history_title'
      get '/searches/search_bar', to: 'searches#index_history'


      resources :subscriptions, only: [:create, :destroy, :index]


      resources :video_like_dislikes, only: [:create, :destroy, :update]
      
  end


end
