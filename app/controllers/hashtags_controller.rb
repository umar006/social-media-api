require './app/models/hashtag'

class HashtagsController
  def create(params)
    hashtag = Hashtag.new(params['hashtags'])
    hashtag.save
  end

  def self.top_5_past_24h
    Hashtag.find_top_5_past_24h
  end
end