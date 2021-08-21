require 'test_helper'
require './app/models/post'
require './app/models/user'
require './app/models/comment'
require './config/env/test'

describe Comment do
  before(:each) do
    client = create_db_client
    client.query('delete from comments')
    client.query('delete from posts')
    client.query('delete from users')
    client.query('alter table posts auto_increment = 1')

    user = User.new('umar', 'umar@gmail.com')
    user.save

    post = Post.new('aku seorang kapiten #generasigigih', "umar")
    post.save

    @valid_comment = Comment.new(1, 'umar', 'halo kapiten')
    @valid_comment.save

    @invalid_comment = Comment.new(nil, nil, 'mumet')
  end

  describe '#initilize' do
    context 'with valid parameters' do
      it 'return value' do
        expect(@valid_comment.post_id).to eq(1)
        expect(@valid_comment.username).to eq('umar')
        expect(@valid_comment.comment).to eq('halo kapiten')
      end
    end

    context 'with invalid parameters' do
      it 'return nil' do
        expect(@invalid_comment.post_id).to be_nil
        expect(@invalid_comment.username).to be_nil
      end
    end
  end

  describe '#save' do
    context 'with valid parameters' do
      it 'save to database' do
        stub = double
        allow(Mysql2::Client).to receive(:new).and_return(stub)

        sql = "insert into comments (post_id, username, comment, attachment, created_at) " \
            + "values ('1', 'umar', 'halo kapiten', '', str_to_date('#{@valid_comment.created_at}', '%d-%m-%Y %H:%i:%s'))"
        expect(stub).to receive(:query).with(sql)
        expect(@valid_comment.save).to eq(true)
      end
    end

    context 'with invalid parameters' do
      it 'return false' do
        expect(@invalid_comment.save).to eq(false)
      end
    end
  end

  describe '#valid?' do
    context 'with valid parameters' do
      it 'return true' do
        expect(@valid_comment.valid?).to eq(true)
      end
    end
  end
end