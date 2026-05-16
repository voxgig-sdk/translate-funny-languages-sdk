<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TranslateFunnyLanguagesMakeContext
{
    public static function call(array $ctxmap, ?TranslateFunnyLanguagesContext $basectx): TranslateFunnyLanguagesContext
    {
        return new TranslateFunnyLanguagesContext($ctxmap, $basectx);
    }
}
