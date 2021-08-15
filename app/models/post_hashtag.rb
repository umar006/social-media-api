require './config/env/development'

class PostHashtag
  def save
    client = create_db_client
    
    post_id = last_insert_id('posts')
    hashtag_id = last_insert_id('hashtags')

    client.query("insert into post_hashtag values ('#{post_id}', '#{hashtag_id}')")
  end

  def last_insert_id(table_name)
    client = create_db_client

    id = client.query("select id from #{table_name} order by id desc").each.first['id']
    id
  end
end