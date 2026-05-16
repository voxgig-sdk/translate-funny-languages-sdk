# TranslateFunnyLanguages SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TranslateFunnyLanguagesFeatures
  def self.make_feature(name)
    case name
    when "base"
      TranslateFunnyLanguagesBaseFeature.new
    when "test"
      TranslateFunnyLanguagesTestFeature.new
    else
      TranslateFunnyLanguagesBaseFeature.new
    end
  end
end
