require './config/env/development'
require './app/models/user'

describe User do
  before(:each) do
    @user_valid = User.new(nil, 'umar', 'valid@gmail.com', nil)
    @user_invalid = User.new(nil, nil, 'invalid@gmail.com', nil)
  end

  describe '#valid?' do
    context 'when valid' do
      it 'return true' do
        expect(@user_valid.valid?).to eq(true)
      end
    end

    context 'when invalid' do
      it 'return false' do
        expect(@user_invalid.valid?).to eq(false)
      end
    end
  end
end