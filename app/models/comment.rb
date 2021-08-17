require './config/env/development'
require './app/models/hashtag'
require 'time'

class Comment
  attr_accessor :comment, :attachment, :created_at, :username

  def initialize(username, comment, attachment=nil, created_at=Time.new)
    @username = username
    @comment = comment
    @attachment = attachment
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end

  def valid?
    return false if username.nil? || comment.nil? || post_id.nil?

    true
  end
end