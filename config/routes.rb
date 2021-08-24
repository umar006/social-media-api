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

  get '/users/new' do
    erb :'users/new'
  end

  post '/users/create' do
    user = UsersController.new
    user.create(params)

    session[:login_user] = params['username']
    
    redirect '/posts'
  end

  get '/users/login' do
    erb :'users/login_form'
  end

  post '/users/login' do
    user = UsersController.find_by_username(params['username'])

    redirect '/users/new' if user.nil?
    
    session[:login_user] = user['username']

    redirect '/posts'
  end

  get '/posts' do
    @posts = PostsController.find_all
    erb :'posts/index'
  end

  get '/posts/new' do
    redirect '/users/login' if session[:login_user].nil?

    erb :'posts/new'
  end

  get '/posts/:id' do
    @post = PostsController.find_by_id(params['id'])
    @comments = CommentsController.find_by_post_id(params['id'])
    erb :'posts/show'
  end

  post '/posts/create' do
    redirect '/users/login' if session[:login_user].nil?

    post_params = {
      'post' => params['post'],
      'attachment' => params['attachment'],
      'username' => session[:login_user]
    }
    post = PostsController.new
    post.create(post_params)

    unless params['post'].scan(/#\w+/).empty?
      hashtags = params['post'].scan(/#\w+/)
      hashtags.each do |hashtag|
        new_hashtag = HashtagsController.new

        if HashtagsController.exist?(hashtag)
          new_hashtag.update(hashtag)
          next
        end
        
        new_hashtag.create(hashtag)
      end

      post_hashtag = PostHashtagsController.new
      post_hashtag.create
    end

    redirect '/posts'
  end

  post '/posts/:id/comment' do
    redirect '/users/login' if session[:login_user].nil?

    comment_params = {
      'comment' => params['comment'],
      'attachment' => params['attachment'],
      'username' => session[:login_user],
      'post_id' => params['id']
    }
    comment = CommentsController.new
    comment.create(comment_params)

    unless params['comment'].scan(/#\w+/).empty?
      hashtag_params = {
        'hashtags' => params['comment'].scan(/#\w+/),
      }
      hashtag = HashtagsController.new
      hashtag.create(hashtag_params)
    end

    redirect '/posts'
  end

  get '/hashtags' do
    @hashtags = HashtagsController.find_all

    erb :'hashtags/index'
  end

  get '/hashtags/trending' do
    @hashtags = HashtagsController.top_5_past_24h
    
    erb :'hashtags/trending'
  end

  get '/hashtags/:hashtag' do
    @posts = Post.find_by_hashtag(params['hashtag'])

    erb :'hashtags/show'
  end
end