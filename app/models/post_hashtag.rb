class PostHashtag
  attr_reader :post_id, :hashtag_id

  def initialize(post_id, hashtag_id)
    @post_id = post_id
    @hashtag_id = hashtag_id
  end
  
  def save
    return false unless valid?

    client = create_db_client

    client.query("insert into post_hashtags values ('#{@post_id}', '#{@hashtag_id}')")

    true
  end

  def valid?
    return false if @post_id.nil? || @hashtag_id.nil?

    true
  end
end