

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


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
      if (!live && maybeSkipControl(t, 'entityOp', 'translator.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"contents","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"success","req":false,"type":"`$OBJECT`","index$":1}],"name":"translator","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"translator","orig":"translator","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /translate/{translator}.json","json":"{\"operationId\":\"translateTextPost\",\"parameters\":[{\"description\":\"The translator/language to use (e.g., morse, sith, valyrian, yoda, shakespeare, minion, pirate, etc.)\",\"in\":\"path\",\"name\":\"translator\",\"required\":true,\"schema\":{\"enum\":[\"morse\",\"sith\",\"valyrian\",\"yoda\",\"shakespeare\",\"minion\",\"pirate\",\"dothraki\",\"klingon\",\"sindarin\",\"quenya\",\"vulcan\",\"huttese\",\"dolan\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"text\":{\"description\":\"The English text to translate\",\"type\":\"string\"}},\"required\":[\"text\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"contents\":{\"properties\":{\"text\":{\"description\":\"The original text\",\"type\":\"string\"},\"translated\":{\"description\":\"The translated text\",\"type\":\"string\"},\"translation\":{\"description\":\"The translation type/language used\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"properties\":{\"total\":{\"description\":\"Number of translations performed\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful translation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - missing or invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/translate/{translator}.json","segments":[{"lit":"translate"},{"lit":"{translator}.json"}],"select":{"exist":["translator"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"translator","orig":"translator","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"text","orig":"text","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /translate/{translator}.json","json":"{\"operationId\":\"translateText\",\"parameters\":[{\"description\":\"The translator/language to use (e.g., morse, sith, valyrian, yoda, shakespeare, minion, pirate, etc.)\",\"in\":\"path\",\"name\":\"translator\",\"required\":true,\"schema\":{\"enum\":[\"morse\",\"sith\",\"valyrian\",\"yoda\",\"shakespeare\",\"minion\",\"pirate\",\"dothraki\",\"klingon\",\"sindarin\",\"quenya\",\"vulcan\",\"huttese\",\"dolan\"],\"type\":\"string\"}},{\"description\":\"The English text to translate\",\"in\":\"query\",\"name\":\"text\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"contents\":{\"text\":\"hello\",\"translated\":\".... . .-.. .-.. ---\",\"translation\":\"morse\"},\"success\":{\"total\":1}},\"schema\":{\"properties\":{\"contents\":{\"properties\":{\"text\":{\"description\":\"The original text\",\"type\":\"string\"},\"translated\":{\"description\":\"The translated text\",\"type\":\"string\"},\"translation\":{\"description\":\"The translation type/language used\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"properties\":{\"total\":{\"description\":\"Number of translations performed\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful translation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - missing or invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/translate/{translator}.json","segments":[{"lit":"translate"},{"lit":"{translator}.json"}],"select":{"exist":["text","translator"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"translator","name__orig":"translator","Name":"Translator","name_":"translator","name-":"translator","NAME":"TRANSLATOR","index$":0}, {"active":true,"entity":"translator","key$":"BasicTranslatorFlow","kind":"basic","name":"BasicTranslatorFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"translator_ref01"},"match":{"translator":"translator01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"translator_ref01","srcdatavar":"translator_ref01_data","suffix":"_dt0"},"match":{"translator":"translator01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-translator_ref01"}}],"index$":1}]}, 'Translator')
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

  const env = envOverride({
    'TRANSLATE_FUNNY_LANGUAGES_TEST_TRANSLATOR_ENTID': idmap,
    'TRANSLATE_FUNNY_LANGUAGES_TEST_LIVE': 'FALSE',
    'TRANSLATE_FUNNY_LANGUAGES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TRANSLATE_FUNNY_LANGUAGES_TEST_TRANSLATOR_ENTID']

  const live = 'TRUE' === env.TRANSLATE_FUNNY_LANGUAGES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TRANSLATE_FUNNY_LANGUAGES_TEST_TRANSLATOR_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
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
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
