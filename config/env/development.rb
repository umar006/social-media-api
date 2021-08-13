require 'mysql2'

def create_db_client
  Mysql2::Client.new(
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'social_media_api_db'
  )
end