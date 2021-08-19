require './app/models/comment'

class CommentsController
  def create(params)
    comment = Comment.new(params['post_id'], params['username'], params['comment'], params['attachment'])
    comment.save
  end
end