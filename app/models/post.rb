require './config/env/development'

class Post
  attr_accessor :id, :post, :attach, :user

  def initialize(id, post, attach, user)
    @id = id
    @post = post
    @attach = attach
    @user = user
  end

  def save
    return false unless valid?

    client = create_db_client

    client.query("insert into posts (post, attachment, user_id) values ('#@post', '#@attach', '#{@user.id}')")

    true
  end

  def valid?
    return false if @post.nil? || @user.nil?

    true
  end
end