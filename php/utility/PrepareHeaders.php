<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility: prepare_headers

class TranslateFunnyLanguagesPrepareHeaders
{
    public static function call(TranslateFunnyLanguagesContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
