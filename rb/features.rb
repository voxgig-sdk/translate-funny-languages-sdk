# TranslateFunnyLanguages SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TranslateFunnyLanguagesFeatures
  def self.make_feature(name)
    case name
    when "base"
      TranslateFunnyLanguagesBaseFeature.new
    when "ratelimit"
      TranslateFunnyLanguagesRatelimitFeature.new
    when "retry"
      TranslateFunnyLanguagesRetryFeature.new
    when "test"
      TranslateFunnyLanguagesTestFeature.new
    when "timeout"
      TranslateFunnyLanguagesTimeoutFeature.new
    else
      TranslateFunnyLanguagesBaseFeature.new
    end
  end
end
