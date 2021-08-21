require './config/env/test'
require './app/models/hashtag'

describe Hashtag do
  before(:each) do
    @valid_hashtag = Hashtag.new(['#generasigigih', '#YayasanAnakBangsaBisa'])
    @invalid_hashtag = Hashtag.new([])
  end

  describe '#initialize' do
    context 'with valid parameters' do
      it 'return mandatory attribute' do
        expect(@valid_hashtag.hashtags).to eq(['#generasigigih', '#YayasanAnakBangsaBisa'])
      end
    end
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
  end

  describe '#valid?' do
    context 'with valid object' do
      it 'return true' do
        expect(@valid_hashtag.valid?).to eq(true)
      end
    end

    context 'invalid object with empty hashtags' do
      it 'return false' do
        expect(@invalid_hashtag.valid?).to eq(false)
      end
    end
  end
end
