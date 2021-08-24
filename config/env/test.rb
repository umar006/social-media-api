require 'mysql2'

def create_db_client
  Mysql2::Client.new(
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'social_media_db_test'
  )
end

def clean_tables
  create_db_client.query('delete from post_hashtags')
  create_db_client.query('delete from hashtags')
  create_db_client.query('delete from comments')
  create_db_client.query('delete from posts')
  create_db_client.query('delete from users')
end

def reset_increment
  create_db_client.query('alter table users auto_increment = 1')
  create_db_client.query('alter table posts auto_increment = 1')
  create_db_client.query('alter table hashtags auto_increment = 1')
  create_db_client.query('alter table comments auto_increment = 1')
end
