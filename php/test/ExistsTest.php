<?php
declare(strict_types=1);

// TranslateFunnyLanguages SDK exists test

require_once __DIR__ . '/../translatefunnylanguages_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TranslateFunnyLanguagesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
