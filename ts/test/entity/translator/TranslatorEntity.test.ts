

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { TranslateFunnyLanguagesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TranslatorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TRANSLATE_FUNNY_LANGUAGES_TEST_LIVE=TRUE.
  afterEach(liveDelay('TRANSLATE_FUNNY_LANGUAGES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TranslateFunnyLanguagesSDK.test()
    const ent = testsdk.Translator()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TRANSLATE_FUNNY_LANGUAGES_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'translator.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set TRANSLATE_FUNNY_LANGUAGES_TEST_TRANSLATOR_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const translator_ref01_ent = client.Translator()
    let translator_ref01_data = setup.data.new.translator['translator_ref01']
    translator_ref01_data['translator'] = setup.idmap['translator01']

    translator_ref01_data = (await translator_ref01_ent.create(translator_ref01_data)).data()
    assert(null != translator_ref01_data)



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/translator/TranslatorTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TranslateFunnyLanguagesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['translator01','translator02','translator03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['TRANSLATE_FUNNY_LANGUAGES_TEST_TRANSLATOR_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'TRANSLATE_FUNNY_LANGUAGES_TEST_TRANSLATOR_ENTID': idmap,
    'TRANSLATE_FUNNY_LANGUAGES_TEST_LIVE': 'FALSE',
    'TRANSLATE_FUNNY_LANGUAGES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TRANSLATE_FUNNY_LANGUAGES_TEST_TRANSLATOR_ENTID']

  const live = 'TRUE' === env.TRANSLATE_FUNNY_LANGUAGES_TEST_LIVE

  if (live) {
    client = new TranslateFunnyLanguagesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {}
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TRANSLATE_FUNNY_LANGUAGES_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
