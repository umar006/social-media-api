require './config/env/development'

class User
  attr_accessor :id, :username, :email, :biodata

  def initialize(id, username, email, biodata)
    @id = id
    @username = username
    @email = email
    @biodata = biodata
  end

  def save
    return false unless valid?

    client = create_db_client

    client.query("insert into users (username, email, biodata) values ('#@username', '#@email', '#@biodata')")
  end

  def valid?
    return false if username.nil? || email.nil?

    true
  end
end
