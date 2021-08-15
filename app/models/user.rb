require './config/env/development'

class User
  attr_accessor :username, :email, :biodata

  def initialize(username, email, biodata=nil)
    @username = username
    @email = email
    @biodata = biodata
  end

  def save
    return false unless valid?

    client = create_db_client

    client.query("insert into users (username, email, biodata) values ('#@username', '#@email', '#@biodata')")

    true
  end

  def valid?
    return false if username.nil? || email.nil?

    true
  end
end
