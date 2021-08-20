require './app/models/post_hashtag'

class PostHashtagsController
  def create
    post_hashtag = PostHashtag.new
    post_hashtag.save
  end
end