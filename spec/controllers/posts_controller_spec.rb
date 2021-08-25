require 'test_helper'
require './app/models/post'
require './app/models/hashtag'
require './app/models/post_hashtag'
require './app/controllers/posts_controller'
require './config/env/test'

describe PostsController do
  before(:each) do
    client = create_db_client
    client.query('delete from posts')
    client.query('delete from hashtags')
    client.query('delete from post_hashtags')
    client.query('alter table posts auto_increment = 1')
    client.query('alter table hashtags auto_increment = 1')

    hashtag = Hashtag.new('generasigigih')
    hashtag.save

    post_hashtag = PostHashtag.new(1, 1)
    post_hashtag.save

    @params_valid = {
      'post' => 'good morning',
      'username' => 'umar2'
    }
    @params_invalid = {
      'post' => nil,
      'username' => 'umar2'
    }
    @post = PostsController.new
    @post.create(@params_valid)
  end
  
  describe '#create' do
    context 'given valid parameters' do
      it 'save post' do
        expected_post = Post.find_by_username('umar2')
        expect(expected_post).not_to be_nil
      end

      it 'return true' do
        expect(@post.create(@params_valid)).to eq(true)
      end
    end

    context 'given invalid parameters' do
      it 'return false' do
        expect(@post.create(@params_invalid)).to eq(false)
      end
    end
  end

  describe '#find_all' do
    it 'post equal to 1' do
      expect(PostsController.find_all.count).to eq(1)
    end
  end

  describe '#find_by_username' do
    it 'post equal to 1' do
      expect(PostsController.find_by_username('umar2').count).to eq(1)
    end
  end

  describe '#find_by_hashtag' do
    it 'post equal to 1' do
      expect(PostsController.find_by_hashtag('generasigigih').count).to eq(1)
    end
  end

  describe '#find_by_id' do
    it 'not nil' do
      expect(PostsController.find_by_id(1)).to_not be_nil
    end
  end
end