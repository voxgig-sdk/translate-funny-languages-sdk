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
            "active": True,
            "name": "content",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "success",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
        ],
        "name": "translator",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "translator",
                      "orig": "translator",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
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
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "translator",
                      "orig": "translator",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "text",
                      "orig": "text",
                      "reqd": True,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
            ],
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
