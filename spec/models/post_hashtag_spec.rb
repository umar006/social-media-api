require './app/models/user'
require './app/models/post'
require './app/models/hashtag'
require './app/models/post_hashtag'
require './config/env/test'

describe PostHashtag do
  before(:each) do
    client = create_db_client
    client.query('delete from post_hashtags')
    client.query('delete from hashtags')
    client.query('delete from comments')
    client.query('delete from posts')
    client.query('delete from users')
    client.query('alter table posts auto_increment = 1')
    client.query('alter table hashtags auto_increment = 1')

    user = User.new('umar', 'umar@gmail.com')
    user.save

    post = Post.new('good night #generasigigih', 'umar')
    post.save

    hashtag = Hashtag.new('generasigigih')
    hashtag.save
    
    @valid_post_hashtag = PostHashtag.new(1, 1)
    @invalid_post_hashtag = PostHashtag.new(nil, nil)
  end

  after(:all) do
    client = create_db_client
    client.query('delete from post_hashtags')
    client.query('delete from hashtags')
    client.query('delete from comments')
    client.query('delete from posts')
    client.query('delete from users')
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