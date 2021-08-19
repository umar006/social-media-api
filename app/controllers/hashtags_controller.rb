require './app/models/hashtag'

class HashtagsController
  def create(params)
    hashtag = Hashtag.new(params['hashtags'], params['created_at'], params['comment'])
    hashtag.save
  end
end