# TranslateFunnyLanguages SDK utility: make_context

from translatefunnylanguages_sdk.core.context import TranslateFunnyLanguagesContext


def make_context_util(ctxmap, basectx):
    return TranslateFunnyLanguagesContext(ctxmap, basectx)
