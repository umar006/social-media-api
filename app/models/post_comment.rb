require './config/env/development'

class PostComment
  def save
    client = create_db_client

    post_id = last_insert_id('posts')
    comment_id = last_insert_id('comments')

    client.query("insert into post_comments values ('#{post_id}', '#{comment_id}')")
  end

  def last_insert_id(table_name)
    client = create_db_client

    id = client.query("select id from #{table_name} order by id desc").each.first['id']
    id
  end
end