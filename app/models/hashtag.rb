require 'time'

class Hashtag
  attr_reader :hashtags, :created_at, :id

  def initialize(hashtag, id=nil, created_at=Time.new)
    @hashtag = hashtag
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end

  def save
    return false unless valid?

    client = create_db_client

    client.query("insert into hashtags (hashtag, created_at) values ('#{@hashtag.downcase}', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'))")

    true
  end

  def valid?
    return false if @hashtag.empty? || @created_at.nil?

    true
  end

  def self.find_all
    client = create_db_client

    hashtags = client.query("select * from hashtags")

    convert_to_array(hashtags)
  end

  def self.find_top_5_past_24h
    client = create_db_client
    
    sql = "select hashtag, id " \
        + "from hashtags " \
        + "where created_at > date_sub(curdate(), interval 1 day) " \
        + "group by hashtag, id " \
        + "order by count(hashtag) desc " \
        + "limit 5;"
    hashtags = client.query(sql)

    convert_to_array(hashtags)
  end

  def self.convert_to_array(raw_data)
    hashtags = []
    raw_data.each do |data|
      hashtag = Hashtag.new(data['hashtag'], data['id'])
      hashtags << hashtag
    end
    hashtags
  end
end