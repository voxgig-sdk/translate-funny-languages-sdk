<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TranslateFunnyLanguagesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TranslateFunnyLanguagesBaseFeature();
            case "test":
                return new TranslateFunnyLanguagesTestFeature();
            default:
                return new TranslateFunnyLanguagesBaseFeature();
        }
    }
}
