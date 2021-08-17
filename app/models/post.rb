require './config/env/development'
require './app/models/hashtag'
require 'time'

class Post
  attr_accessor :post, :attach, :username, :created_at

  def initialize(post, username, attach=nil, created_at=Time.new)
    @post = post
    @attach = attach
    @username = username
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end

  def save
    return false unless valid?

    client = create_db_client

    client.query("insert into posts (post, attachment, created_at, username) values ('#@post', '#@attach', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'), '#@username')")

    unless @post.scan(/#\w+/).empty?
      hashtags = Hashtag.new(@post.scan(/#\w+/), @created_at)
      hashtags.save
    end

    true
  end

  def valid?
    return false if @post.nil? || @username.nil? || @post.size > 1000

    true
  end

  def self.convert_to_array(raw_data)
    posts = []
    raw_data.each do |data|
      post = Post.new(data['post'], data['username'], data['attachment'])
      posts << post
    end
    posts
  end
end