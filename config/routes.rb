Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  namespace :api,  defaults: {format: 'json'} do
      resources :users, only: [:create]
      
      resource :session, only: [:create, :destroy]
      post '/session/email', to: 'sessions#email'

      resources :user_channels, only: [:create, :index, :show]
      resources :videos, only: [:show]
      get '/videos/index_lite/:channel_id', to: 'videos#index_lite'
  end


end
