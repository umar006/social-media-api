require './config/env/development'
require './app/models/hashtag'
require './app/models/post_comment'
require 'time'

class Comment
  attr_accessor :comment, :attachment, :created_at, :username, :post_id

  def initialize(post_id, username, comment, attachment=nil, created_at=Time.new)
    @post_id = post_id
    @username = username
    @comment = comment
    @attachment = attachment
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end

  def save
    return false unless valid?

    client = create_db_client

    sql = "insert into comments (post_id, username, comment, attachment, created_at) " \
        + "values ('#@post_id', '#@username', '#@comment', '#@attachment', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'))"
    client.query(sql)

    save_to_post_comment

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
    return false if username.nil? || comment.nil? || post_id.nil?

    true
  end
end