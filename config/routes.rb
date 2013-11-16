Myapp::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  match '/api/blogs' => 'nexus#blogsFetch', :via => :get
  match '/api/blogs' => 'nexus#blogCreate', :via => :put
  match '/api/blogs/:id' => 'nexus#blogUpdate', :via => :put
  match '/api/blogs/:id' => 'nexus#blogDelete', :via => :delete
  match '/api/imgCreate' => 'nexus#imgCreate', :via => :post
  match '/api/loginValidate' => 'nexus#accountValidate', :via => :post
  match '/api/loginNotify' => 'nexus#accountRegist', :via => :post
  root :to => 'nexus#index'
end
