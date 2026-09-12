import { TranslatorEntity } from './entity/TranslatorEntity';
export type * from './TranslateFunnyLanguagesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TranslateFunnyLanguagesEntityBase } from './TranslateFunnyLanguagesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TranslateFunnyLanguagesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Translator(entopts?: Record<string, any>): TranslatorEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TranslateFunnyLanguagesSDK;
    tester(testopts?: any, sdkopts?: any): TranslateFunnyLanguagesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TranslateFunnyLanguagesSDK;
export { stdutil, config, BaseFeature, TranslateFunnyLanguagesEntityBase, TranslateFunnyLanguagesSDK, SDK, };
