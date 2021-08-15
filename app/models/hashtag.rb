require './config/env/development'
require './app/models/post_hashtag'

class Hashtag
  attr_accessor :hashtag, :created_at

  def initialize(hashtags, created_at)
    @hashtags = hashtags
    @created_at = created_at
  end

  def save
    return false unless valid?

    client = create_db_client
    post_hashtag = PostHashtag.new

    @hashtags.each do |hashtag|
      client.query("insert into hashtags (hashtag, created_at) values ('#{hashtag.downcase}', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'))")

      post_hashtag.save
    end

    true
  end

  def valid?
    return false if @hashtags.nil? || @hashtags.empty? || @created_at.nil?

    true
  end
end