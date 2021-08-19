require './app/models/user'

class UsersController
  def create(params)
    user = User.new(params['username'], params['email'], params['biodata'])
    user.save
  end
end