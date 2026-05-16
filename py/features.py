# TranslateFunnyLanguages SDK feature factory

from feature.base_feature import TranslateFunnyLanguagesBaseFeature
from feature.test_feature import TranslateFunnyLanguagesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TranslateFunnyLanguagesBaseFeature(),
        "test": lambda: TranslateFunnyLanguagesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
