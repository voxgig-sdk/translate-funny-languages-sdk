// Typed models for the TranslateFunnyLanguages SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Translator {
  contents?: Record<string, any>
  success?: Record<string, any>
}

export interface TranslatorLoadMatch {
  translator: string
  text: string
}

export interface TranslatorCreateData {
  translator: string
  contents?: Record<string, any>
  success?: Record<string, any>
}

