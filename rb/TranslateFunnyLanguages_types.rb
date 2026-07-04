# frozen_string_literal: true

# Typed models for the TranslateFunnyLanguages SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Translator entity data model.
#
# @!attribute [rw] content
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Hash, nil]
Translator = Struct.new(
  :content,
  :success,
  keyword_init: true
)

# Request payload for Translator#load.
#
# @!attribute [rw] translator
#   @return [String]
TranslatorLoadMatch = Struct.new(
  :translator,
  keyword_init: true
)

# Request payload for Translator#create.
#
# @!attribute [rw] translator
#   @return [String]
TranslatorCreateData = Struct.new(
  :translator,
  keyword_init: true
)

