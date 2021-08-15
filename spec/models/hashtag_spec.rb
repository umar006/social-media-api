require './config/env/test'
require './app/models/hashtag'

describe Hashtag do
  before(:each) do
    @valid_hashtag = Hashtag.new(['#generasigigih', '#YayasanAnakBangsaBisa'], '15-08-2021 18:55:45')
    @invalid_hashtag = Hashtag.new([], '15-08-2021 18:55:45')
    @invalid_timestamp = Hashtag.new(['#generasigigih'], nil)
  end

  describe '#save' do
    context 'with valid object' do
      it 'return true' do
        expect(@valid_hashtag.save).to eq(true)
      end
    end

    context 'invalid object with empty hashtags' do
      it 'return false' do
        expect(@invalid_hashtag.save).to eq(false)
      end
    end

    context 'invalid object with empty timestamp' do
      it 'return false' do
        expect(@invalid_timestamp.save).to eq(false)
      end
    end
  end
end
