Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace "api" do
    namespace "v1" do

      resources :users, only: [:create]
      resources :games, only: [:index, :show, :create]
      resources :active_games, only: [:create, :update, :destroy]

      mount ActionCable.server => '/cable'

    end
  end
end
