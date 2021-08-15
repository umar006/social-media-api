require './config/env/development'
require 'time'

class Post
  attr_accessor :post, :attach, :user, :created_at

  def initialize(post, attach=nil, created_at=Time.new, user)
    @post = post
    @attach = attach
    @user = user
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end

  def save
    return false unless valid?

    client = create_db_client

    client.query("insert into posts (post, attachment, created_at, username) values ('#@post', '#@attach', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'), '#{@user.username}')")

    unless @post.scan(/#\w+/).empty?
      hashtags = Hashtag.new(@post.scan(/#\w+/), @created_at)
      hashtags.save
    end

    true
  end

  def valid?
    return false if @post.nil? || @user.nil? || @post.size > 1000

    true
  end
end