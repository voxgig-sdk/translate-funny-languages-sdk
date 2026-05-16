# TranslateFunnyLanguages SDK utility: make_context
require_relative '../core/context'
module TranslateFunnyLanguagesUtilities
  MakeContext = ->(ctxmap, basectx) {
    TranslateFunnyLanguagesContext.new(ctxmap, basectx)
  }
end
