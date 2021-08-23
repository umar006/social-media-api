require 'time'

class Post
  attr_reader :post, :attachment, :username, :created_at, :id

  def initialize(post, username, attachment=nil, id=nil, created_at=Time.new)
    @post = post
    @attachment = attachment
    @username = username
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
    @id = id
  end

  def save
    return false unless valid?

    client = create_db_client
    
    client.query("insert into posts (post, attachment, created_at, username) values ('#@post', '#@attachment', str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'), '#@username')")

    true
  end

  def valid?
    return false if @post.nil? || @username.nil? || @post.size > 1000

    true
  end

  def self.find_all
    client = create_db_client

    posts = client.query('select * from posts')

    convert_to_array(posts)
  end

  def self.find_by_id(id)
    client = create_db_client

    post = client.query("select * from posts where id='#{id}'")

    convert_to_array(post).first
  end

  def self.find_by_username(username)
    client = create_db_client

    sql = "select * from posts where username='#{username}'"
    posts = client.query(sql)

    convert_to_array(posts)
  end

  def self.find_by_hashtag(hashtag)
    client = create_db_client

    sql = "select posts.id, posts.username, posts.post, posts.attachment " +
          "from post_hashtags " +
          "join posts on posts.id = post_hashtags.post_id " +
          "join hashtags on hashtags.id = post_hashtags.hashtag_id " +
          "where hashtags.hashtag = '#{hashtag.downcase}';"
    posts = client.query(sql)

    convert_to_array(posts)
  end

  def self.convert_to_array(raw_data)
    posts = []
    raw_data.each do |data|
      post = Post.new(data['post'], data['username'], data['attachment'], data['id'])
      posts << post
    end
    posts
  end
end