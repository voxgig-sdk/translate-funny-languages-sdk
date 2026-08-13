# TranslateFunnyLanguages SDK feature factory

from translatefunnylanguages_sdk.feature.base_feature import TranslateFunnyLanguagesBaseFeature
from translatefunnylanguages_sdk.feature.test_feature import TranslateFunnyLanguagesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TranslateFunnyLanguagesBaseFeature(),
        "test": lambda: TranslateFunnyLanguagesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
