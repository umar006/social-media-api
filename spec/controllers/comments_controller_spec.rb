require 'test_helper'
require './app/models/post'
require './app/models/comment'
require './app/models/user'
require './app/controllers/comments_controller'
require './config/env/test'

describe CommentsController do
  before(:each) do
    client = create_db_client
    client.query('delete from post_hashtags')
    client.query('delete from hashtags')
    client.query('delete from comments')
    client.query('delete from posts')
    client.query('delete from users')
    client.query('alter table posts auto_increment = 1')

    user = User.new('umar2', 'umar2@gmail.com')
    user.save
    post = Post.new("good morning", "umar2")
    post.save

    @valid_params = {
      'post_id' => 1,
      'username' => 'umar2',
      'comment' => 'good morning too',
      'attachment' => nil
    }
    @invalid_params = {
      'post_id' => nil,
      'username' => nil,
      'comment' => 'good morning too',
      'attachment' => nil
    }
    @comment = CommentsController.new
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
      it 'return true' do
        expect(@comment.create(@valid_params)).to eq(true)
      end

      it 'save comment to database' do
        @comment.create(@valid_params)

        expected_comment = Comment.find_by_username('umar2')
        expect(expected_comment).not_to be_nil
      end
    end

    context 'with invalid parameters' do
      it 'return false' do
        expect(@comment.create(@invalid_params)).to eq(false)
      end
    end
  end
end