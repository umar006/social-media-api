require './app/models/post'

class PostsController
  def create(params)
    post = Post.new(params['post'], params['username'])
    post.save
  end
end