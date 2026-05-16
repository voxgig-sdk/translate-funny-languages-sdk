-- TranslateFunnyLanguages SDK error

local TranslateFunnyLanguagesError = {}
TranslateFunnyLanguagesError.__index = TranslateFunnyLanguagesError


function TranslateFunnyLanguagesError.new(code, msg, ctx)
  local self = setmetatable({}, TranslateFunnyLanguagesError)
  self.is_sdk_error = true
  self.sdk = "TranslateFunnyLanguages"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TranslateFunnyLanguagesError:error()
  return self.msg
end


function TranslateFunnyLanguagesError:__tostring()
  return self.msg
end


return TranslateFunnyLanguagesError
