<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK configuration

class TranslateFunnyLanguagesConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TranslateFunnyLanguages",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.funtranslations.com",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "translator" => [],
                ],
            ],
            "entity" => [
        'translator' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'content',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
          ],
          'name' => 'translator',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'translator',
                        'orig' => 'translator',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'POST',
                  'orig' => '/translate/{translator}.json',
                  'parts' => [
                    'translate',
                    '{translator}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'translator',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'translator',
                        'orig' => 'translator',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'text',
                        'orig' => 'text',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/translate/{translator}.json',
                  'parts' => [
                    'translate',
                    '{translator}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'text',
                      'translator',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'translate',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TranslateFunnyLanguagesFeatures::make_feature($name);
    }
}
