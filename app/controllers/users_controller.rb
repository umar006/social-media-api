require './app/models/user'

class UsersController
  def create(params)
    user = User.new(params['username'], params['email'], params['biodata'])
    user.save
  end

  def self.find_by_username(username)
    User.find_by_username(username)
  end
end