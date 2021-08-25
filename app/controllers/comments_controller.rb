require './app/models/comment'

class CommentsController
  def create(params)
    unless params['attachment'].nil?
      comment = Comment.new(params['post_id'], params['username'], params['comment'], params['attachment']['filename'])

      filename = params['attachment']['filename']
      file = params['attachment']['tempfile']
      File.binwrite("./public/comments/#{params['username']}_#{filename}", file.read)
    else
      comment = Comment.new(params['post_id'], params['username'], params['comment'])
    end
    comment.save
  end

  def self.find_by_post_id(post_id)
    Comment.find_by_post_id(post_id)
  end

  def self.find_by_username(username)
    Comment.find_by_username(username)
  end
end