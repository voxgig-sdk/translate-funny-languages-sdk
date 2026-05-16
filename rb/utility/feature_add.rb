# TranslateFunnyLanguages SDK utility: feature_add
module TranslateFunnyLanguagesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
