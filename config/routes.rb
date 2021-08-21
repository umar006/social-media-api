require 'sinatra/base'
require './app/controllers/users_controller'
require './app/controllers/posts_controller'
require './app/controllers/hashtags_controller'
require './app/controllers/comments_controller'
require './app/controllers/post_hashtags_controller'

class Application < Sinatra::Base
  configure do
    set :views, 'app/views'
    enable :sessions
  end

  get '/' do
    erb :home
  end

  get '/users' do
    erb :'users/index'
  end

  get '/users/new' do
    erb :'users/new'
  end

  post '/users/create' do
    user = UsersController.new
    user.create(params)
    session[:username] = params['username']
    redirect '/users'
  end

  get '/users/login' do
    erb :'users/login_form'
  end

  post '/users/login' do
    user = UsersController.find_by_username(params['username'])

    redirect '/users/new' if user.nil?
    
    session[:username] = user['username']

    redirect '/posts'
  end

  get '/posts' do
    erb :'posts/index'
  end

  get '/posts/new' do
    erb :'posts/new'
  end

  post '/posts/create' do
    param = {
      'post' => params['post'],
      'attachment' => params['attachment'],
      'username' => session[:username]
    }
    post = PostsController.new
    post.create(param)

    unless params['post'].scan(/#\w+/).empty?
      param = {
        'hashtags' => params['post'].scan(/#\w+/),
      }
      hashtag = HashtagsController.new
      hashtag.create(param)

      post_hashtag = PostHashtagsController.new
      post_hashtag.create
    end
    redirect '/posts'
  end
end