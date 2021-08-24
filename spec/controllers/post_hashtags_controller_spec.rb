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

    @post_hashtag = PostHashtagsController.new
  end

  describe '#create' do
    context 'with valid parameters' do
      it 'return true' do
        expect(@post_hashtag.create(@params_valid)).to eq(true)
      end
    end
  end
end