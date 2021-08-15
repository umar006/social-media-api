require './config/env/test'
require './app/models/hashtag'

describe Hashtag do
  before(:each) do
    @valid_hashtag = Hashtag.new(['#generasigigih', '#YayasanAnakBangsaBisa'], '15-08-2021 18:55:45')
    @invalid_hashtag = Hashtag.new([], '15-08-2021 18:55:45')
    @invalid_timestamp = Hashtag.new(['#generasigigih'], nil)
  end
end
