require './app/models/comment'

class CommentsController
  def create(params)
    comment = Comment.new(params['post_id'], params['username'], params['comment'], params['attachment'])
    comment.save
  end

  def self.find_by_post_id(post_id)
    Comment.find_by_post_id(post_id)
  end
end