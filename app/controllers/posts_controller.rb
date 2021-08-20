require './app/models/post'

class PostsController
  def create(params)
    post = Post.new(params['post'], params['username'], params['attachment'])
    post.save

    filename = params[:file][:filename]
    file = params[:file][:tempfile]
    unless params['attachment'].nil? || params['attachment'].empty?
      File.binwrite("./public/#{params['username']}_#{filename}", file.read)
    end
  end
end