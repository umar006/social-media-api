require './app/models/post'
require './app/models/user'

describe Post do
  before(:each) do
    user = User.new('umar', 'umar@gmail.com', nil)
    @valid_post = Post.new('aku seorang kapiten', nil, user)
    @invalid_post = Post.new(nil, nil, user)
    @invalid_post_2 = Post.new("test" * 300, nil, user)
  end

  describe '#save' do
    context 'with valid object' do
      it 'save to database' do
        stub = double
        allow(Mysql2::Client).to receive(:new).and_return(stub)

        expect(stub).to receive(:query).with("insert into posts (post, attachment, created_at, username) values ('#{@valid_post.post}', '#{@valid_post.attach}', str_to_date('#{@valid_post.created_at}', '%d-%m-%Y %H:%i:%s'), '#{@valid_post.user.username}')")
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
end