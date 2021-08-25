class User
  attr_reader :username, :email, :biodata, :id

  def initialize(username, email, biodata=nil, id=nil)
    @username = username
    @email = email
    @biodata = biodata
    @id = id
  end

  def save
    return false unless valid?

    client = create_db_client

    sql = "insert into users (username, email, biodata) " \
        + "values ('#@username', '#@email', '#@biodata')"
    client.query(sql)

    true
  end

  def valid?
    return false if username.nil? || email.nil?

    true
  end

  def self.find_by_username(username)
    client = create_db_client
    user = client.query("select * from users where username='#{username}'")
    user.each
  end
end
