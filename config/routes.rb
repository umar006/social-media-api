require 'sinatra/base'
require './app/controllers/users_controller'
require './app/controllers/posts_controller'
require './app/controllers/hashtags_controller'
require './app/controllers/comments_controller'

class Application < Sinatra::Base
  configure do
    set :views, 'app/views'
  end

  get '/user' do
    erb :'users/index'
  end

  get '/user/new' do
    erb :'users/new'
  end

  post '/user/create' do
    user = UsersController.new
    user.create(params)
    redirect '/user'
  end
end