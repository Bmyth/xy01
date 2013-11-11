Myapp::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  match '/api/blogs' => 'nexus#blogGet', :via => :get
  match '/api/blogs' => 'nexus#blogCreate', :via => :put
  match '/api/imgAdd' => 'nexus#imgAdd', :via => :post
  root :to => 'nexus#index'
end
