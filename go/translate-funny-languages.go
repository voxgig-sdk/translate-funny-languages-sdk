package voxgigtranslatefunnylanguagessdk

import (
	"github.com/voxgig-sdk/translate-funny-languages-sdk/core"
	"github.com/voxgig-sdk/translate-funny-languages-sdk/entity"
	"github.com/voxgig-sdk/translate-funny-languages-sdk/feature"
	_ "github.com/voxgig-sdk/translate-funny-languages-sdk/utility"
)

// Type aliases preserve external API.
type TranslateFunnyLanguagesSDK = core.TranslateFunnyLanguagesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TranslateFunnyLanguagesEntity = core.TranslateFunnyLanguagesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TranslateFunnyLanguagesError = core.TranslateFunnyLanguagesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTranslatorEntityFunc = func(client *core.TranslateFunnyLanguagesSDK, entopts map[string]any) core.TranslateFunnyLanguagesEntity {
		return entity.NewTranslatorEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTranslateFunnyLanguagesSDK = core.NewTranslateFunnyLanguagesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
