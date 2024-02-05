require './app/models/post_hashtag'

class PostHashtagsController
  def create(params)
    post_hashtag = PostHashtag.new(params['post_id'], params['hashtag_id'])
    post_hashtag.save
  end
end