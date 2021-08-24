class PostHashtag
  attr_reader :post_id, :hashtag_id

  def initialize(post_id, hashtag_id)
    @post_id = post_id
    @hashtag_id = hashtag_id
  end
  
  def save
    client = create_db_client
    
    post_id = last_insert_id('posts')
    hashtag_id = last_insert_id('hashtags')

    client.query("insert into post_hashtags values ('#{post_id}', '#{hashtag_id}')")
  end

  def last_insert_id(table_name)
    client = create_db_client

    id = client.query("select id from #{table_name} order by id desc").each.first['id']
    id
  end
end