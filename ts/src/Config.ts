
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.funtranslations.com',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      translator: {
      },

    }
  }


  entity = {
    "translator": {
      "fields": [
        {
          "active": true,
          "name": "content",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "success",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        }
      ],
      "name": "translator",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "translator",
                    "orig": "translator",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "POST",
              "orig": "/translate/{translator}.json",
              "parts": [
                "translate",
                "{translator}.json"
              ],
              "select": {
                "exist": [
                  "translator"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "translator",
                    "orig": "translator",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "text",
                    "orig": "text",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/translate/{translator}.json",
              "parts": [
                "translate",
                "{translator}.json"
              ],
              "select": {
                "exist": [
                  "text",
                  "translator"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "translate"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

