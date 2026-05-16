# TranslateFunnyLanguages SDK configuration

module TranslateFunnyLanguagesConfig
  def self.make_config
    {
      "main" => {
        "name" => "TranslateFunnyLanguages",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.funtranslations.com",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "translator" => {},
        },
      },
      "entity" => {
        "translator" => {
          "fields" => [
            {
              "name" => "content",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "success",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "translator",
          "op" => {
            "create" => {
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "translator",
                        "orig" => "translator",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "POST",
                  "orig" => "/translate/{translator}.json",
                  "parts" => [
                    "translate",
                    "{translator}.json",
                  ],
                  "select" => {
                    "exist" => [
                      "translator",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "create",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "translator",
                        "orig" => "translator",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "text",
                        "orig" => "text",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/translate/{translator}.json",
                  "parts" => [
                    "translate",
                    "{translator}.json",
                  ],
                  "select" => {
                    "exist" => [
                      "text",
                      "translator",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "translate",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    TranslateFunnyLanguagesFeatures.make_feature(name)
  end
end
