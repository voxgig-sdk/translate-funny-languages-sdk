# TranslateFunnyLanguages SDK configuration

module TranslateFunnyLanguagesConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "TranslateFunnyLanguages",
        "slug" => "translate-funny-languages",
        "version" => "0.0.1",
        "target" => "rb",
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
              "name" => "contents",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "success",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "translator",
          "op" => {
            "create" => {
              "input" => "data",
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
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
            },
            "load" => {
              "input" => "data",
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
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "text",
                        "orig" => "text",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
