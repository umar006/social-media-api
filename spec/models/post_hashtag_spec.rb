require './app/models/post_hashtag'
require './config/env/test'

describe PostHashtag do
  before(:each) do
    client = create_db_client
    client.query('delete from post_hashtags')

    @valid_post_hashtag = PostHashtag.new(1, 1)
    @invalid_post_hashtag = PostHashtag.new(nil, 1)
  end

  describe '#initialize' do
    it 'post_id and hashtag_id return 1' do
      expect(@valid_post_hashtag.post_id).to eq(1)
      expect(@valid_post_hashtag.hashtag_id).to eq(1)
    end
  end

  describe '#valid?' do
    context 'with valid parameters' do
      it 'return true' do
        expect(@valid_post_hashtag.valid?).to eq(true)
      end
    end

    context 'with invalid parameters' do
      it 'return false if one of attributes nil' do
        expect(@invalid_post_hashtag.valid?).to eq(false)
      end
    end
  end

  describe '#save' do
    context 'with valid parameters' do
      it 'return true' do
        expect(@valid_post_hashtag.save).to eq(true)
      end
    end

    context 'with invalid parameters' do
      it 'return false' do
        expect(@invalid_post_hashtag.save).to eq(false)
      end
    end
  end
end