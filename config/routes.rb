

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: { format: "json" } do
    resources :users, only: [:create]

    resource :session, only: [:create, :destroy]
    #fix this to get
    post "/session/email", to: "sessions#email"

    # shallow nesting videos because videos belong to channel
    resources :user_channels, only: [:index, :show] do
      # The index method will exist inside of the VideosController
      resources :videos, only: [:index] # 
    end

    resources :videos, only: [:show, :create] do
      patch "update_views", on: :member
      get "recommend", on: :member
      resources :video_posts, only: [:index]
    end

    resources :video_posts, only: [:create, :destroy]

    # param is to change the default :id to :query
    resources :searches, param: :query, only: [:create] do
      get "search_titles", on: :member
      # The index method will exist inside of the VideosController
      # It will hit the same index as the user_channel
      # However we can check for the keys as prescibed by rails routes to act 
      # accordingly
      resources :videos, only: [:index]
    end
    # The reason why this route exists is if the search bar in the frontend is empty
    # The :query parameter would be empty, thus creating the url searches/search_titiles 
    # instead. This URL should be used to fetch history only.
    get 'searches/search_titles', to: "searches#history"

    resources :subscriptions, only: [:create, :destroy, :index]

    # While this belongs to a user, but we'll never make a request with user as a param
    resources :video_like_dislikes, only: [:create, :destroy, :update]

    resource :direct_upload, only: [:create, :destroy]
  end
end
