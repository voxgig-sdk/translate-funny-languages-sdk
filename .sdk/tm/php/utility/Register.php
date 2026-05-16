<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TranslateFunnyLanguagesUtility::setRegistrar(function (TranslateFunnyLanguagesUtility $u): void {
    $u->clean = [TranslateFunnyLanguagesClean::class, 'call'];
    $u->done = [TranslateFunnyLanguagesDone::class, 'call'];
    $u->make_error = [TranslateFunnyLanguagesMakeError::class, 'call'];
    $u->feature_add = [TranslateFunnyLanguagesFeatureAdd::class, 'call'];
    $u->feature_hook = [TranslateFunnyLanguagesFeatureHook::class, 'call'];
    $u->feature_init = [TranslateFunnyLanguagesFeatureInit::class, 'call'];
    $u->fetcher = [TranslateFunnyLanguagesFetcher::class, 'call'];
    $u->make_fetch_def = [TranslateFunnyLanguagesMakeFetchDef::class, 'call'];
    $u->make_context = [TranslateFunnyLanguagesMakeContext::class, 'call'];
    $u->make_options = [TranslateFunnyLanguagesMakeOptions::class, 'call'];
    $u->make_request = [TranslateFunnyLanguagesMakeRequest::class, 'call'];
    $u->make_response = [TranslateFunnyLanguagesMakeResponse::class, 'call'];
    $u->make_result = [TranslateFunnyLanguagesMakeResult::class, 'call'];
    $u->make_point = [TranslateFunnyLanguagesMakePoint::class, 'call'];
    $u->make_spec = [TranslateFunnyLanguagesMakeSpec::class, 'call'];
    $u->make_url = [TranslateFunnyLanguagesMakeUrl::class, 'call'];
    $u->param = [TranslateFunnyLanguagesParam::class, 'call'];
    $u->prepare_auth = [TranslateFunnyLanguagesPrepareAuth::class, 'call'];
    $u->prepare_body = [TranslateFunnyLanguagesPrepareBody::class, 'call'];
    $u->prepare_headers = [TranslateFunnyLanguagesPrepareHeaders::class, 'call'];
    $u->prepare_method = [TranslateFunnyLanguagesPrepareMethod::class, 'call'];
    $u->prepare_params = [TranslateFunnyLanguagesPrepareParams::class, 'call'];
    $u->prepare_path = [TranslateFunnyLanguagesPreparePath::class, 'call'];
    $u->prepare_query = [TranslateFunnyLanguagesPrepareQuery::class, 'call'];
    $u->result_basic = [TranslateFunnyLanguagesResultBasic::class, 'call'];
    $u->result_body = [TranslateFunnyLanguagesResultBody::class, 'call'];
    $u->result_headers = [TranslateFunnyLanguagesResultHeaders::class, 'call'];
    $u->transform_request = [TranslateFunnyLanguagesTransformRequest::class, 'call'];
    $u->transform_response = [TranslateFunnyLanguagesTransformResponse::class, 'call'];
});
