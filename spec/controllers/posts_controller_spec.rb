require './app/models/post'
require './app/controllers/posts_controller'
require './config/env/test'

describe PostsController do
  before(:each) do
    @params_valid = {
      'post' => 'good morning',
      'username' => 'umar2'
    }
    @params_invalid = {
      'post' => nil,
      'username' => 'umar2'
    }
    @post = PostsController.new
    
    client = create_db_client
    client.query("delete from posts")
  end
  
  describe '#create' do
    context 'given valid parameters' do
      it 'save post' do
        @post.create(@params_valid)

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
end