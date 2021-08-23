require 'time'

class Comment
  attr_reader :comment, :attachment, :created_at, :username, :post_id, :id

  def initialize(post_id, username, comment, attachment=nil, id=nil, created_at=Time.new)
    @post_id = post_id
    @username = username
    @comment = comment
    @attachment = attachment
    @created_at = created_at.strftime("%d-%m-%Y %H:%M:%S")
  end

  def save
    return false unless valid?

    client = create_db_client

    sql = "insert into comments (post_id, username, comment, attachment, created_at) " \
        + "values ('#@post_id', '#@username', '#@comment', '#@attachment', " \
        + "str_to_date('#@created_at', '%d-%m-%Y %H:%i:%s'))"
    client.query(sql)

    true
  end

  def self.find_by_post_id(post_id)
    client = create_db_client

    comments = client.query("select * from comments where post_id='#{post_id}'")

    convert_to_array(comments)
  end

  def self.find_by_username(username)
    client = create_db_client

    comments = client.query("select * from comments where username='#{username}'")

    convert_to_array(comments)
  end

  def self.convert_to_array(raw_data)
    comments = []
    raw_data.each do |data|
      comment = Comment.new(data['post_id'], data['username'], data['comment'], data['attachment'], data['id'])
      comments << comment
    end
    comments
  end
  
  def valid?
    return false if username.nil? || comment.nil? || post_id.nil?

    true
  end
end