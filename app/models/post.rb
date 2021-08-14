require './config/env/development'

class Post
  attr_accessor :id, :post, :attach, :user_id

  def initialize(id, post, attach, user)
    @id = id
    @post = post
    @attach = attach
    @user = user
  end
end