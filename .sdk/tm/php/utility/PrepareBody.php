<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility: prepare_body

class TranslateFunnyLanguagesPrepareBody
{
    public static function call(TranslateFunnyLanguagesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
