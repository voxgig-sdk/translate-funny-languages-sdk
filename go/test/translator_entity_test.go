package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/translate-funny-languages-sdk/go"
	"github.com/voxgig-sdk/translate-funny-languages-sdk/go/core"

	vs "github.com/voxgig-sdk/translate-funny-languages-sdk/go/utility/struct"
)

func TestTranslatorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Translator(nil)
		if ent == nil {
			t.Fatal("expected non-nil TranslatorEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := translatorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "translator." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		translatorRef01Ent := client.Translator(nil)
		translatorRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "translator"}, setup.data), "translator_ref01"))
		translatorRef01Data["translator"] = setup.idmap["translator01"]

		translatorRef01DataResult, err := translatorRef01Ent.Create(translatorRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		translatorRef01Data = core.ToMapAny(translatorRef01DataResult)
		if translatorRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		translatorRef01MatchDt0 := map[string]any{}
		translatorRef01DataDt0Loaded, err := translatorRef01Ent.Load(translatorRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if translatorRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func translatorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "translator", "TranslatorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read translator test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse translator test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"translator01", "translator02", "translator03", "translate01", "translate02", "translate03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID": idmap,
		"TRANSLATEFUNNYLANGUAGES_TEST_LIVE":      "FALSE",
		"TRANSLATEFUNNYLANGUAGES_TEST_EXPLAIN":   "FALSE",
		"TRANSLATEFUNNYLANGUAGES_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TRANSLATEFUNNYLANGUAGES_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TRANSLATEFUNNYLANGUAGES_APIKEY"],
			},
			extra,
		})
		client = sdk.NewTranslateFunnyLanguagesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TRANSLATEFUNNYLANGUAGES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TRANSLATEFUNNYLANGUAGES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
