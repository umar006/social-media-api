require 'test_helper'
require './config/env/test'
require './app/models/user'

describe User do
  before(:each) do
    client = create_db_client
    client.query('delete from users')

    @valid_user = User.new('umar', 'umar@gmail.com')
    @valid_user.save
    @invalid_user = User.new(nil, 'umar@gmail.com')
  end

  describe '#initialize' do
    context 'with valid parameters' do
      it 'return umar and umar@gmail.com' do
        expect(@valid_user.username).to eq('umar')
        expect(@valid_user.email).to eq('umar@gmail.com')
      end
    end

    context 'with invalid parameters' do
      it 'return nil and umar@gmail.com' do
        expect(@invalid_user.username).to be_nil
        expect(@invalid_user.email).to eq('umar@gmail.com')
      end
    end
  end

  describe '#valid?' do
    context 'with valid object' do
      it 'return true' do
        expect(@valid_user.valid?).to eq(true)
      end
    end

    context 'with invalid object' do
      it 'return false' do
        expect(@invalid_user.valid?).to eq(false)
      end
    end
  end

  describe '#save' do
    context 'with valid object' do
      it 'save to database' do
        stub = double
        allow(Mysql2::Client).to receive(:new).and_return(stub)

        expect(stub).to receive(:query).with("insert into users (username, email, biodata) values ('#{@valid_user.username}', '#{@valid_user.email}', '#{@valid_user.biodata}')")

        expect(@valid_user.save).to eq(true)
      end
    end

    context 'with invalid object' do
      it 'return false' do
        expect(@invalid_user.save).to eq(false)
      end
    end
  end

  describe '#find_by_username' do
    it 'not nil when username exist' do
      expect(User.find_by_username('umar')).not_to be_nil
    end

    it 'nil when when username does not exist' do
      expect(User.find_by_username('umaru')).to be_nil
    end
  end
end