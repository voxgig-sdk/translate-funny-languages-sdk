<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility: result_headers

class TranslateFunnyLanguagesResultHeaders
{
    public static function call(TranslateFunnyLanguagesContext $ctx): ?TranslateFunnyLanguagesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
