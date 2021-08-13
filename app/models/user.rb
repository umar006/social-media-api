require './config/env/development'

class User
  attr_accessor :id, :username, :email, :biodata

  def initialize(id, username, email, biodata)
    @id = id
    @username = username
    @email = email
    @biodata = biodata
  end

  def valid?
    return false if username.nil? || email.nil?

    true
  end
end
