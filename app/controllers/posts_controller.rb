require './app/models/post'

class PostsController
  def create(params)
    unless params['attachment'].nil?
      post = Post.new(params['post'], params['username'], params['attachment']['filename'])

      filename = params['attachment']['filename']
      file = params['attachment']['tempfile']
      File.binwrite("./public/posts/#{params['username']}_#{filename}", file.read)
    else
      post = Post.new(params['post'], params['username'])
    end

    post.save
  end
end