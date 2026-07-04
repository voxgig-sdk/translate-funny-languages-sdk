-- Typed models for the TranslateFunnyLanguages SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Translator
---@field content? table
---@field success? table

---@class TranslatorLoadMatch
---@field translator string

---@class TranslatorCreateData
---@field translator string

local M = {}

return M
