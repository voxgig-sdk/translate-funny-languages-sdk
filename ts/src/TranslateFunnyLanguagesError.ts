
import { Context } from './Context'


class TranslateFunnyLanguagesError extends Error {

  isTranslateFunnyLanguagesError = true

  sdk = 'TranslateFunnyLanguages'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TranslateFunnyLanguagesError
}

