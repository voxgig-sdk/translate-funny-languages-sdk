<?php
declare(strict_types=1);

// Translator entity test

require_once __DIR__ . '/../translatefunnylanguages_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TranslatorEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TranslateFunnyLanguagesSDK::test(null, null);
        $ent = $testsdk->Translator(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = translator_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "translator." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $translator_ref01_ent = $client->Translator(null);
        $translator_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.translator"), "translator_ref01"));
        $translator_ref01_data["translator"] = $setup["idmap"]["translator01"];

        [$translator_ref01_data_result, $err] = $translator_ref01_ent->create($translator_ref01_data, null);
        $this->assertNull($err);
        $translator_ref01_data = Helpers::to_map($translator_ref01_data_result);
        $this->assertNotNull($translator_ref01_data);

        // LOAD
        $translator_ref01_match_dt0 = [];
        [$translator_ref01_data_dt0_loaded, $err] = $translator_ref01_ent->load($translator_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($translator_ref01_data_dt0_loaded);

    }
}

function translator_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/translator/TranslatorTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TranslateFunnyLanguagesSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["translator01", "translator02", "translator03", "translate01", "translate02", "translate03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID" => $idmap,
        "TRANSLATEFUNNYLANGUAGES_TEST_LIVE" => "FALSE",
        "TRANSLATEFUNNYLANGUAGES_TEST_EXPLAIN" => "FALSE",
        "TRANSLATEFUNNYLANGUAGES_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TRANSLATEFUNNYLANGUAGES_TEST_TRANSLATOR_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["TRANSLATEFUNNYLANGUAGES_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["TRANSLATEFUNNYLANGUAGES_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new TranslateFunnyLanguagesSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["TRANSLATEFUNNYLANGUAGES_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["TRANSLATEFUNNYLANGUAGES_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
