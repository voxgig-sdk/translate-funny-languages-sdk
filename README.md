# TranslateFunnyLanguages SDK

Translate English into fictional and novelty languages like Morse code, Sith, and Valyrian

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Translate Funny Languages

[Fun Translations](https://funtranslations.com/) runs a family of RESTful translation APIs that turn ordinary English into novelty or fictional languages. This SDK targets the small subset of those translators exposed under `https://api.funtranslations.com`, focused on funny and pop-culture languages.

What you get from the API:
- Single-shot text translation via a GET request, e.g. `GET /translate/morse.json?text=...`
- Novelty translators including Morse code, Sith, and Valyrian, drawn from Fun Translations' wider catalogue of 100+ translators (Yoda, Shakespeare, Pirate, Minion, Game of Thrones, Star Wars, Elvish, Star Trek, and more).
- JSON responses suitable for direct embedding in chat, games, or web UIs.

Operational notes: the service is a RESTful JSON API authenticated by an API key tied to your Fun Translations account. Pricing is per-translator on monthly plans, and free-tier usage is heavily rate-limited. Specific quota numbers and endpoint contracts are documented per-translator on the provider's site rather than as a single OpenAPI spec.

## Try it

**TypeScript**
```bash
npm install translate-funny-languages
```

**Python**
```bash
pip install translate-funny-languages-sdk
```

**PHP**
```bash
composer require voxgig/translate-funny-languages-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/translate-funny-languages-sdk/go
```

**Ruby**
```bash
gem install translate-funny-languages-sdk
```

**Lua**
```bash
luarocks install translate-funny-languages-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TranslateFunnyLanguagesSDK } from 'translate-funny-languages'

const client = new TranslateFunnyLanguagesSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o translate-funny-languages-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "translate-funny-languages": {
      "command": "/abs/path/to/translate-funny-languages-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Translator** | A novelty language translator that converts English input text into a chosen fictional or stylised language; called via paths like `GET /translate/{language}.json?text=...` (for example `/translate/morse.json`). | `/translate/{translator}.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from translatefunnylanguages_sdk import TranslateFunnyLanguagesSDK

client = TranslateFunnyLanguagesSDK({})


# Load a specific translator
translator, err = client.Translator(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'translatefunnylanguages_sdk.php';

$client = new TranslateFunnyLanguagesSDK([]);


// Load a specific translator
[$translator, $err] = $client->Translator(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/translate-funny-languages-sdk/go"

client := sdk.NewTranslateFunnyLanguagesSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "TranslateFunnyLanguages_sdk"

client = TranslateFunnyLanguagesSDK.new({})


# Load a specific translator
translator, err = client.Translator(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("translate-funny-languages_sdk")

local client = sdk.new({})


-- Load a specific translator
local translator, err = client:Translator(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TranslateFunnyLanguagesSDK.test()
const result = await client.Translator().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TranslateFunnyLanguagesSDK.test(None, None)
result, err = client.Translator(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TranslateFunnyLanguagesSDK::test(null, null);
[$result, $err] = $client->Translator(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Translator(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TranslateFunnyLanguagesSDK.test(nil, nil)
result, err = client.Translator(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Translator(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Translate Funny Languages

- Upstream: [https://funtranslations.com/](https://funtranslations.com/)
- API docs: [https://funtranslations.com/api](https://funtranslations.com/api)

- Operated commercially by Fun Translations (https://funtranslations.com/).
- Access uses an API key obtained by creating a free account; paid plans start around $4.99/month per translator.
- No public licence text is published for response data; consult the provider's terms before redistributing translations.
- Community catalogue listings have at times flagged the public endpoint as unreliable; check status before depending on it.

---

Generated from the Translate Funny Languages OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
