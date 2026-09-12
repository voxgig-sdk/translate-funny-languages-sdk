import { TranslateFunnyLanguagesEntityBase } from '../TranslateFunnyLanguagesEntityBase';
import type { TranslateFunnyLanguagesSDK } from '../TranslateFunnyLanguagesSDK';
import type { Control } from '../types';
import type { Translator, TranslatorLoadMatch, TranslatorCreateData } from '../TranslateFunnyLanguagesTypes';
declare class TranslatorEntity extends TranslateFunnyLanguagesEntityBase<Translator> {
    constructor(client: TranslateFunnyLanguagesSDK, entopts: any);
    make(this: TranslatorEntity): TranslatorEntity;
    load(this: any, reqmatch?: TranslatorLoadMatch, ctrl?: Control): Promise<TranslatorEntity>;
    create(this: any, reqdata?: TranslatorCreateData, ctrl?: Control): Promise<TranslatorEntity>;
}
export { TranslatorEntity };
