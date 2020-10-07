Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :auth do
      devise_scope :user do
        get '/confirmation', to: 'confirmations#show'
        post '/sign_in', to: 'sessions#create'
        post '/sign_up', to: 'registrations#create'
      end
    end
  end
end
