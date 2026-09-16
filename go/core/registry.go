package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewTranslatorEntityFunc func(client *TranslateFunnyLanguagesSDK, entopts map[string]any) TranslateFunnyLanguagesEntity

