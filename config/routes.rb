

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: { format: "json" } do
    resources :users, only: [:create]

    resource :session, only: [:create, :destroy]
    # Emails should be done using post for security reasons, since posting does SSL, etc.
    post "/session/email", to: "sessions#email"

    resources :user_channels, only: [:index, :show] do
      resources :videos, only: [:index]
    end

    resources :videos, only: [:show, :create] do
      patch "update_views", on: :member
      get "recommend", on: :member
      resources :video_posts, only: [:index]
    end

    resources :video_posts, only: [:create, :destroy, :update] do
      get "replies", on: :member
    end
    
    # param is to change the default :id to :query
    resources :searches, param: :query, only: [:create] do
      get "search_titles", on: :member
      resources :videos, only: [:index]
    end
    get "searches/search_titles", to: "searches#history"

    resources :subscriptions, only: [:create, :destroy, :index]

    # While this belongs to a user, but we'll never make a request with user as a param
    resources :video_like_dislikes, only: [:create, :destroy, :update]

    resource :direct_upload, only: [:create, :destroy]
  end
end
