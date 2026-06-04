
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { TranslateFunnyLanguagesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('TranslatorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TRANSLATEFUNNYLANGUAGES_TEST_LIVE=TRUE.
  afterEach(liveDelay('TRANSLATEFUNNYLANGUAGES_TEST_LIVE'))

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

    translator_ref01_data = await translator_ref01_ent.create(translator_ref01_data)
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
    ['translator01','translator02','translator03','translate01','translate02','translate03'],
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
      {
      },
      extra
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
  
