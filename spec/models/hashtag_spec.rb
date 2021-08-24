require 'test_helper'
require './app/models/hashtag'
require './config/env/test'

describe Hashtag do
  before(:each) do
    client = create_db_client
    client.query('delete from hashtags')

    @valid_hashtag = Hashtag.new('generasigigih')
    @valid_hashtag.save
    @invalid_hashtag = Hashtag.new([])
  end

  describe '#initialize' do
    context 'with valid parameters' do
      it 'return mandatory attribute' do
        expect(@valid_hashtag.hashtag).to eq('generasigigih')
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

  describe '#find_top_5_past_24h' do
    it 'not nil' do
      expect(Hashtag.find_top_5_past_24h).not_to be_nil
    end
  end
end
