package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTranslatorEntityFunc func(client *TranslateFunnyLanguagesSDK, entopts map[string]any) TranslateFunnyLanguagesEntity

