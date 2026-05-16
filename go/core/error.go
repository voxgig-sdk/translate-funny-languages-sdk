package core

type TranslateFunnyLanguagesError struct {
	IsTranslateFunnyLanguagesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTranslateFunnyLanguagesError(code string, msg string, ctx *Context) *TranslateFunnyLanguagesError {
	return &TranslateFunnyLanguagesError{
		IsTranslateFunnyLanguagesError: true,
		Sdk:              "TranslateFunnyLanguages",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TranslateFunnyLanguagesError) Error() string {
	return e.Msg
}
