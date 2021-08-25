require 'test_helper'
require './app/models/comment'
require './app/controllers/comments_controller'
require './config/env/test'

describe CommentsController do
  before(:each) do
    client = create_db_client
    client.query('delete from comments')

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
    @comment.create(@valid_params)
  end

  describe '#create' do
    context 'with valid parameters' do
      it 'return true' do
        expect(@comment.create(@valid_params)).to eq(true)
      end

      it 'save comment to database' do
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

  describe '#find_by_post_id' do
    it 'comment equal to 1' do
      expect(CommentsController.find_by_post_id(1).count).to eq(1)
    end
  end
end