Myapp::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  root :to => 'nexus#index'
end
