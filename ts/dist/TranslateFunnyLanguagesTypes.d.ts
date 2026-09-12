export interface Translator {
    contents?: Record<string, any>;
    success?: Record<string, any>;
}
export interface TranslatorLoadMatch {
    translator: string;
    text: string;
}
export interface TranslatorCreateData {
    translator: string;
    contents?: Record<string, any>;
    success?: Record<string, any>;
}
