require './config/env/development'
require './app/models/post_hashtag'

class Hashtag
  attr_accessor :hashtags, :created_at, :comment

  def initialize(hashtags, created_at=nil, comment=false)
    @hashtags = hashtags
    @created_at = created_at
    @comment = comment
  end

  def save
    return false unless valid?

    client = create_db_client

    @hashtags.each do |hashtag|
      client.query("insert into hashtags (hashtag, created_at) values ('#{hashtag.downcase}', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'))")

      save_to_post_hashtag unless @comment
    end

    true
  end

  def save_to_post_hashtag
    post_hashtag = PostHashtag.new
    post_hashtag.save
  end

  def valid?
    return false if @hashtags.nil? || @hashtags.empty?

    true
  end

  def self.find_top_5_past_24h
    client = create_db_client
    
    sql = "select hashtag " \
          + "from hashtags " \
          + "where created_at > date_sub(curdate(), interval 1 day) " \
          + "group by hashtag " \
          + "order by count(hashtag) desc " \
          + "limit 5;"
    hashtags = client.query(sql)

    convert_to_array(hashtags)
  end

  def self.convert_to_array(raw_data)
    hashtags = []
    raw_data.each do |data|
      hashtag = Hashtag.new(data['hashtag'])
      hashtags << hashtag
    end
    hashtags
  end
end