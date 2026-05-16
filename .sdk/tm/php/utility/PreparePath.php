<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK utility: prepare_path

class TranslateFunnyLanguagesPreparePath
{
    public static function call(TranslateFunnyLanguagesContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
