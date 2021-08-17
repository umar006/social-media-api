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
      save_to_hashtag
    end

    true
  end

  def save_to_hashtag
    hashtags = Hashtag.new(@post.scan(/#\w+/), @created_at)
    hashtags.save
  end

  def valid?
    return false if @post.nil? || @username.nil? || @post.size > 1000

    true
  end

  def self.find_by_hashtag(hashtag)
    client = create_db_client

    sql = "select posts.username, posts.post, posts.attachment " +
          "from post_hashtags " +
          "join posts on posts.id = post_hashtag.post_id " +
          "join hashtags on hashtags.id = post_hashtag.hashtag_id " +
          "where hashtags.hashtag = '#{hashtag.downcase}';"
    posts = client.query(sql)

    convert_to_array(posts)
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