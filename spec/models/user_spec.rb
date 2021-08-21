require './config/env/test'
require './app/models/user'

describe User do
  before(:each) do
    @valid_user = User.new('umar', 'umar@gmail.com')
    @invalid_user = User.new(nil, 'umar@gmail.com')
  end

  describe '#initialize' do
    context 'with valid parameters' do
      it 'return umar and umar@gmail.com' do
        expect(@valid_user.username).to eq('umar')
        expect(@valid_user.email).to eq('umar@gmail.com')
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
        mock = double
        allow(Mysql2::Client).to receive(:new).and_return(mock)

        expect(mock).to receive(:query).with("insert into users (username, email, biodata) values ('#{@valid_user.username}', '#{@valid_user.email}', '#{@valid_user.biodata}')")

        expect(@valid_user.save).to eq(true)
      end
    end

    context 'with invalid object' do
      it 'return false' do
        expect(@invalid_user.save).to eq(false)
      end
    end
  end
end