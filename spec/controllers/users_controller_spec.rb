require 'test_helper'
require './app/models/user'
require './app/controllers/users_controller'
require './config/env/test'

describe UsersController do
  before(:each) do
    client = create_db_client
    client.query('delete from users')
  end

  describe '#create' do
    context 'when given valid parameters' do
      it 'save user' do
        params = {
          'username' => 'umar2',
          'email' => 'umar2@gmail.com',
          'biodata' => nil
        }
        user = UsersController.new
        user.create(params)

        expected_user = User.find_by_username('umar2')
        expect(expected_user).not_to be_nil
      end
    end
  end
end