require 'test_helper'
require './app/controllers/posts_controller'
require './config/env/test'

describe PostsController do
  before(:each) do
    client = create_db_client
    client.query('delete from posts')
    client.query('alter table posts auto_increment = 1')

    @params_valid = {
      'post' => 'good morning',
      'username' => 'umar2',
      'id' => 1
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

  describe '#find_by_id' do
    it 'not nil' do
      expect(PostsController.find_by_id(1)).to_not be_nil
    end
  end

  describe '#find_by_post' do
    it 'not nil' do
      expect(PostsController.find_by_post('good morning')).to_not be_nil
    end
  end
end