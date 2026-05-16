# TranslateFunnyLanguages SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TranslateFunnyLanguagesUtility.registrar = ->(u) {
  u.clean = TranslateFunnyLanguagesUtilities::Clean
  u.done = TranslateFunnyLanguagesUtilities::Done
  u.make_error = TranslateFunnyLanguagesUtilities::MakeError
  u.feature_add = TranslateFunnyLanguagesUtilities::FeatureAdd
  u.feature_hook = TranslateFunnyLanguagesUtilities::FeatureHook
  u.feature_init = TranslateFunnyLanguagesUtilities::FeatureInit
  u.fetcher = TranslateFunnyLanguagesUtilities::Fetcher
  u.make_fetch_def = TranslateFunnyLanguagesUtilities::MakeFetchDef
  u.make_context = TranslateFunnyLanguagesUtilities::MakeContext
  u.make_options = TranslateFunnyLanguagesUtilities::MakeOptions
  u.make_request = TranslateFunnyLanguagesUtilities::MakeRequest
  u.make_response = TranslateFunnyLanguagesUtilities::MakeResponse
  u.make_result = TranslateFunnyLanguagesUtilities::MakeResult
  u.make_point = TranslateFunnyLanguagesUtilities::MakePoint
  u.make_spec = TranslateFunnyLanguagesUtilities::MakeSpec
  u.make_url = TranslateFunnyLanguagesUtilities::MakeUrl
  u.param = TranslateFunnyLanguagesUtilities::Param
  u.prepare_auth = TranslateFunnyLanguagesUtilities::PrepareAuth
  u.prepare_body = TranslateFunnyLanguagesUtilities::PrepareBody
  u.prepare_headers = TranslateFunnyLanguagesUtilities::PrepareHeaders
  u.prepare_method = TranslateFunnyLanguagesUtilities::PrepareMethod
  u.prepare_params = TranslateFunnyLanguagesUtilities::PrepareParams
  u.prepare_path = TranslateFunnyLanguagesUtilities::PreparePath
  u.prepare_query = TranslateFunnyLanguagesUtilities::PrepareQuery
  u.result_basic = TranslateFunnyLanguagesUtilities::ResultBasic
  u.result_body = TranslateFunnyLanguagesUtilities::ResultBody
  u.result_headers = TranslateFunnyLanguagesUtilities::ResultHeaders
  u.transform_request = TranslateFunnyLanguagesUtilities::TransformRequest
  u.transform_response = TranslateFunnyLanguagesUtilities::TransformResponse
}
