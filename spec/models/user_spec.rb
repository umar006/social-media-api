require './config/env/test'
require './app/models/user'

describe User do
  before(:each) do
    @user_valid = User.new('umar', 'valid@gmail.com', nil)
    @user_invalid = User.new(nil, 'invalid@gmail.com', nil)
  end

  describe '#valid?' do
    context 'with valid object' do
      it 'return true' do
        expect(@user_valid.valid?).to eq(true)
      end
    end

    context 'with invalid object' do
      it 'return false' do
        expect(@user_invalid.valid?).to eq(false)
      end
    end
  end

  describe '#save' do
    context 'with valid object' do
      it 'save to database' do
        mock = double
        allow(Mysql2::Client).to receive(:new).and_return(mock)

        expect(mock).to receive(:query).with("insert into users (username, email, biodata) values ('#{@user_valid.username}', '#{@user_valid.email}', '#{@user_valid.biodata}')")
        expect(@user_valid.save).to eq(true)
      end
    end

    context 'with invalid object' do
      it 'return false' do
        expect(@user_invalid.save).to eq(false)
      end
    end
  end
end