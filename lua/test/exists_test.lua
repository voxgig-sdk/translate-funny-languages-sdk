-- TranslateFunnyLanguages SDK exists test

local sdk = require("translate-funny-languages_sdk")

describe("TranslateFunnyLanguagesSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
