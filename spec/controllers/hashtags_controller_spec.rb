require 'test_helper'
require './app/models/hashtag'
require './app/controllers/hashtags_controller'
require './config/env/test'

describe HashtagsController do
  before(:each) do
    client = create_db_client
    client.query('delete from hashtags')

    @params_valid = 'generasigigih'
    @params_invalid = ''

    @hashtag = HashtagsController.new
    @hashtag.create(@params_valid)
  end

  describe '#create' do
    context 'with valid parameters' do
      it 'save hashtags' do
        expected_hashtag = Hashtag.find_top_5_past_24h
        expect(expected_hashtag).not_to be_nil
      end

      it 'return true' do
        expect(@hashtag.create(@params_valid)).to eq(true)
      end
    end

    context 'with invalid parameters' do
      it 'return false' do
        expect(@hashtag.create(@params_invalid)).to eq(false)
      end
    end
  end

  describe '#top_5_past_24h' do
    it 'hashtag equal to 1' do
      expect(HashtagsController.top_5_past_24h.count).to eq(1)
    end
  end

  describe '#find_by_hashtag' do
    it 'hashtag equal to 1' do
      expect(HashtagsController.find_by_hashtag('generasigigih')).to_not be_nil
    end
  end
end