class PostComment
  def last_insert_id(table_name)
    client = create_db_client

    id = client.query("select id from #{table_name} order by id desc").each.first['id']
    id
  end
end