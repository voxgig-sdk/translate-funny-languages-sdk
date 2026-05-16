package = "voxgig-sdk-translate-funny-languages"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/translate-funny-languages-sdk.git"
}
description = {
  summary = "TranslateFunnyLanguages SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["translate-funny-languages_sdk"] = "translate-funny-languages_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
