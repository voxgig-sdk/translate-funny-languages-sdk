<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility: feature_add

class TranslateFunnyLanguagesFeatureAdd
{
    public static function call(TranslateFunnyLanguagesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
