require 'time'

class Hashtag
  attr_accessor :hashtags, :created_at

  def initialize(hashtags, created_at=Time.new)
    @hashtags = hashtags
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end

  def save
    return false unless valid?

    client = create_db_client

    @hashtags.each do |hashtag|
      client.query("insert into hashtags (hashtag, created_at) values ('#{hashtag.downcase}', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'))")
    end

    true
  end

  def valid?
    return false if @hashtags.empty? || @created_at.nil?

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