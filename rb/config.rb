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
              "active" => true,
              "name" => "content",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "success",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 1,
            },
          ],
          "name" => "translator",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "translator",
                        "orig" => "translator",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
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
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "translator",
                        "orig" => "translator",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "text",
                        "orig" => "text",
                        "reqd" => true,
                        "type" => "`$STRING`",
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
                  "index$" => 0,
                },
              ],
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
