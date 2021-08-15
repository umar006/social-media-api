require './config/env/development'
require './app/models/post_hashtag'

class Hashtag
  attr_accessor :hashtag, :created_at

  def initialize(hashtags, created_at)
    @hashtags = hashtags
    @created_at = created_at
  end

  def valid?
    return false if @hashtags.nil? || @hashtags.empty? || @created_at.nil?

    true
  end
end