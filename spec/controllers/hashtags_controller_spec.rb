require './app/controllers/hashtags_controller'
require './app/models/hashtag'
require './config/env/test'

describe HashtagsController do
  before(:each) do
    @params_valid = {
      'hashtags' => ['#generasigigih', '#yayasananakbangsa'],
      'created_at' => '12-12-12 12:12:12',
      'comment' => false
    }
    @hashtag = HashtagsController.new

    client = create_db_client
    client.query('delete from hashtags')
  end

  describe '#create' do
    context 'with valid parameters' do
      it 'save hashtags' do
        @hashtag.create(@params_valid)

        expected_hashtag = Hashtag.find_top_5_past_24h
        expect(expected_hashtag).not_to be_nil
      end
    end
  end
end