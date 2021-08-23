require 'test_helper'
require './app/controllers/hashtags_controller'
require './app/models/hashtag'
require './config/env/test'

describe HashtagsController do
  before(:each) do
    client = create_db_client
    client.query('delete from post_hashtags')
    client.query('delete from hashtags')
    client.query('delete from comments')
    client.query('delete from posts')
    client.query('delete from users')

    @params_valid = '#generasigigih'
    @params_invalid = ''
    @hashtag = HashtagsController.new
  end

  after(:all) do
    client = create_db_client
    client.query('delete from post_hashtags')
    client.query('delete from hashtags')
    client.query('delete from comments')
    client.query('delete from posts')
    client.query('delete from users')
  end

  describe '#create' do
    context 'with valid parameters' do
      it 'save hashtags' do
        @hashtag.create(@params_valid)

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
end