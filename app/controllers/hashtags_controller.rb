require './app/models/hashtag'

class HashtagsController
  def create(params)
    hashtag = Hashtag.new(params['hashtags'])
    hashtag.save
  end
end