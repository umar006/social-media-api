require './config/env/development'
require 'time'

class Comment
  attr_accessor :comment, :attachment, :created_at, :username, :post_id

  def initialize(username, comment, post_id, attachment=nil, created_at=Time.new)
    @username = username
    @comment = comment
    @post_id = post_id
    @attachment = attachment
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end
end