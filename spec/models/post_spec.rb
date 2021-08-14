require './app/models/post'
require './app/models/user'

describe Post do
  before(:each) do
    user = User.new(1, 'umar', 'umar@gmail.com', nil)
    @valid_post = Post.new(nil, 'aku seorang kapiten', nil, user)
    @invalid_post = Post.new(nil, nil, nil, user)
  end

  describe '#save' do
    context 'with valid object' do
      it 'save to database' do
        stub = double
        allow(Mysql2::Client).to receive(:new).and_return(stub)

        expect(stub).to receive(:query).with("insert into posts (post, attachment, user_id) values ('#{@valid_post.post}', '#{@valid_post.attach}', '#{@valid_post.user.id}')")
        expect(@valid_post.save).to eq(true)
      end
    end
  end
end