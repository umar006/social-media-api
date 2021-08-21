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

  def self.find_all
    Post.find_all
  end

  def self.find_by_id(id)
    Post.find_by_id(id)
  end
end