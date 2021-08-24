require 'test_helper'
require './app/models/post'
require './config/env/test'

describe Post do
  before(:each) do
    client = create_db_client
    client.query('delete from posts')
    
    @valid_post = Post.new('aku seorang kapiten #generasigigih', "umar")
    @valid_post.save
    
    @invalid_post = Post.new(nil, "umar")
    @invalid_post_2 = Post.new("test" * 300, "umar")
  end

  describe '#initialize' do
    context 'with valid parameters' do
      it 'return all mandatory atribute' do
        expect(@valid_post.post).to eq('aku seorang kapiten #generasigigih')
        expect(@valid_post.username).to eq('umar')
      end
    end

    context 'with invalid parameters' do
      it 'return nil for post attribute' do
        expect(@invalid_post.post).to be_nil
      end
    end
  end

  describe '#save' do
    context 'with valid object' do
      it 'save to database' do
        stub = double
        allow(Mysql2::Client).to receive(:new).and_return(stub)

        expect(stub).to receive(:query).with("insert into posts (post, attachment, created_at, username) values ('#{@valid_post.post}', '#{@valid_post.attachment}', str_to_date('#{@valid_post.created_at}', '%d-%m-%Y %H:%i:%s'), '#{@valid_post.username}')")
        expect(@valid_post.save).to eq(true)
      end
    end

    context 'with invalid object' do
      it 'return false' do
        expect(@invalid_post.save).to eq(false)
      end
    end

    context 'post more than 1000 characters' do
      it 'return false' do
        expect(@invalid_post_2.save).to eq(false)
      end
    end
  end

  describe '#valid?' do
    context 'with valid parameters' do
      it 'return true' do
        expect(@valid_post.valid?).to eq(true)
      end
    end
    
    context 'with invalid parameters' do
      it 'return false' do
        expect(@invalid_post.valid?).to eq(false)
      end
    end
  end

  describe '#find_all' do
    it 'not nil' do
      expect(Post.find_all).not_to be_nil
    end
  end

  describe '#find_by_username' do
    it 'not nil' do
      expect(Post.find_by_username('umar')).not_to be_nil
    end
  end

  describe '#find_by_hashtag' do
    it 'not nil' do
      expect(Post.find_by_hashtag('#generasigigih')).not_to be_nil
    end
  end
end