Rails.application.routes.draw do
  devise_for :admins
  root 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :visited_countries, only: [:index, :create, :destroy] do
        resources :gallery_links, only: [:index, :create, :update, :destroy]
      end
      get '/logged_in', to: 'auth#logged_in?'
    end
  end
end
