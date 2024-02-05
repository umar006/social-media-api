require './app/controllers/post_hashtags_controller'
require './config/env/test'

describe PostHashtagsController do
  before(:each) do
    client = create_db_client
    client.query('delete from post_hashtags')

    @params_valid = {
      'post_id' => 1,
      'hashtag_id' => 1
    }
    @params_invalid = {
      'post_id' => nil,
      'hashtag_id' => 1
    }
    @params_invalid_2 = {
      'post_id' => 1,
      'hashtag_id' => nil
    }

    @post_hashtag = PostHashtagsController.new
  end

  describe '#create' do
    context 'with valid parameters' do
      it 'return true' do
        expect(@post_hashtag.create(@params_valid)).to eq(true)
      end
    end

    context 'with invalid parameters' do
      it 'return false when post_id nil' do
        expect(@post_hashtag.create(@params_invalid)).to eq(false)
      end

      it 'return false when hashtag_id nil' do
        expect(@post_hashtag.create(@params_invalid_2)).to eq(false)
      end
    end
  end
end