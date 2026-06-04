# Translator entity test

require "minitest/autorun"
require "json"
require_relative "../TranslateFunnyLanguages_sdk"
require_relative "runner"

class TranslatorEntityTest < Minitest::Test
  def test_create_instance
    testsdk = TranslateFunnyLanguagesSDK.test(nil, nil)
    ent = testsdk.Translator(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = translator_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "translator." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    translator_ref01_ent = client.Translator(nil)
    translator_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.translator"), "translator_ref01"))
    translator_ref01_data["translator"] = setup[:idmap]["translator01"]

    translator_ref01_data_result, err = translator_ref01_ent.create(translator_ref01_data, nil)
    assert_nil err
    translator_ref01_data = Helpers.to_map(translator_ref01_data_result)
    assert !translator_ref01_data.nil?

    # LOAD
    translator_ref01_match_dt0 = {}
    translator_ref01_data_dt0_loaded, err = translator_ref01_ent.load(translator_ref01_match_dt0, nil)
    assert_nil err
    assert !translator_ref01_data_dt0_loaded.nil?

  end
end

def translator_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "translator", "TranslatorTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = TranslateFunnyLanguagesSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["translator01", "translator02", "translator03", "translate01", "translate02", "translate03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID" => idmap,
    "TRANSLATEFUNNYLANGUAGES_TEST_LIVE" => "FALSE",
    "TRANSLATEFUNNYLANGUAGES_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["TRANSLATEFUNNYLANGUAGES_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = TranslateFunnyLanguagesSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["TRANSLATEFUNNYLANGUAGES_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["TRANSLATEFUNNYLANGUAGES_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
