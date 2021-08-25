require './app/models/hashtag'

class HashtagsController
  def create(hashtag)
    new_hashtag = Hashtag.new(hashtag)
    new_hashtag.save
  end

  def update(hashtag)
    update_hashtag = Hashtag.new(hashtag)
    update_hashtag.update
  end

  def self.find_by_hashtag(hashtag)
    Hashtag.find_by_hashtag(hashtag).first
  end

  def self.top_5_past_24h
    Hashtag.find_top_5_past_24h
  end

  def self.find_all
    Hashtag.find_all
  end
end