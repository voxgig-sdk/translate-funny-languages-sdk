# ProjectName SDK exists test

import pytest
from translatefunnylanguages_sdk import TranslateFunnyLanguagesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TranslateFunnyLanguagesSDK.test(None, None)
        assert testsdk is not None
