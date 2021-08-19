require './app/models/post'
require './app/models/comment'
require './app/controllers/comments_controller'
require './config/env/test'

describe CommentsController do
  before(:each) do
    client = create_db_client
    client.query('delete from comments')
    client.query('delete from posts')

    post = Post.new("good morning", "umar2")
    post.save
    post_id = client.query("select id from posts where username='umar2'").each.first['id']

    @valid_params = {
      'post_id' => post_id,
      'username' => 'umar2',
      'comment' => 'good morning too',
      'attachment' => nil
    }
    @comment = CommentsController.new
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
  end
end