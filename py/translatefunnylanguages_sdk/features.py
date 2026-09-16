# TranslateFunnyLanguages SDK feature factory

from translatefunnylanguages_sdk.feature.base_feature import TranslateFunnyLanguagesBaseFeature
from translatefunnylanguages_sdk.feature.ratelimit_feature import TranslateFunnyLanguagesRatelimitFeature
from translatefunnylanguages_sdk.feature.retry_feature import TranslateFunnyLanguagesRetryFeature
from translatefunnylanguages_sdk.feature.test_feature import TranslateFunnyLanguagesTestFeature
from translatefunnylanguages_sdk.feature.timeout_feature import TranslateFunnyLanguagesTimeoutFeature


_FEATURES = {
    "base": lambda: TranslateFunnyLanguagesBaseFeature(),
    "ratelimit": lambda: TranslateFunnyLanguagesRatelimitFeature(),
    "retry": lambda: TranslateFunnyLanguagesRetryFeature(),
    "test": lambda: TranslateFunnyLanguagesTestFeature(),
    "timeout": lambda: TranslateFunnyLanguagesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
