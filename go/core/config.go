package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "TranslateFunnyLanguages",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.funtranslations.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"translator": map[string]any{},
			},
		},
		"entity": map[string]any{
			"translator": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "content",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
				},
				"name": "translator",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "translator",
											"orig": "translator",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"method": "POST",
								"orig": "/translate/{translator}.json",
								"parts": []any{
									"translate",
									"{translator}.json",
								},
								"select": map[string]any{
									"exist": []any{
										"translator",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "create",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "translator",
											"orig": "translator",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "text",
											"orig": "text",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/translate/{translator}.json",
								"parts": []any{
									"translate",
									"{translator}.json",
								},
								"select": map[string]any{
									"exist": []any{
										"text",
										"translator",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"translate",
						},
					},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
