require './app/models/post'

class PostsController
  def create(params)
    unless params['attachment'].nil?
      post = Post.new(params['post'], params['username'], params['attachment']['filename'], params['id'])

      filename = params['attachment']['filename']
      file = params['attachment']['tempfile']
      File.binwrite("./public/posts/#{params['username']}_#{filename}", file.read)
    else
      post = Post.new(params['post'], params['username'], nil, params['id'])
    end

    post.save
  end

  def self.find_all
    Post.find_all
  end

  def self.find_by_id(id)
    Post.find_by_id(id).first
  end

  def self.find_by_hashtag(hashtag)
    Post.find_by_hashtag(hashtag)
  end

  def self.find_by_post(post)
    Post.find_by_post(post).first
  end
end