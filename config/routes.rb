Rails.application.routes.draw do
  resources :contact_infos

  match 'contact_infos/searchContacts' => 'contact_infos#searchContacts', via: [:post]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
