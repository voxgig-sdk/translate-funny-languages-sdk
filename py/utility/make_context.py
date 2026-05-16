# TranslateFunnyLanguages SDK utility: make_context

from core.context import TranslateFunnyLanguagesContext


def make_context_util(ctxmap, basectx):
    return TranslateFunnyLanguagesContext(ctxmap, basectx)
