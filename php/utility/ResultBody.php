<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility: result_body

class TranslateFunnyLanguagesResultBody
{
    public static function call(TranslateFunnyLanguagesContext $ctx): ?TranslateFunnyLanguagesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
