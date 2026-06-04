# TranslateFunnyLanguages SDK configuration


def make_config():
    return {
        "main": {
            "name": "TranslateFunnyLanguages",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.funtranslations.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "translator": {},
            },
        },
        "entity": {
      "translator": {
        "fields": [
          {
            "name": "content",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "success",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "translator",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "translator",
                      "orig": "translator",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "POST",
                "orig": "/translate/{translator}.json",
                "parts": [
                  "translate",
                  "{translator}.json",
                ],
                "select": {
                  "exist": [
                    "translator",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "translator",
                      "orig": "translator",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "text",
                      "orig": "text",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/translate/{translator}.json",
                "parts": [
                  "translate",
                  "{translator}.json",
                ],
                "select": {
                  "exist": [
                    "text",
                    "translator",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "translate",
            ],
          ],
        },
      },
    },
    }
