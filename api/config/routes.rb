Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }

  get 'profile', to: 'users#profile'

  resources :bookmarks
end
