/* tslint:disable */
/* eslint-disable */
/**
 * Translate Plus API
 * Our APIs allow developers to translate any text into more than 100 languages from Google Translate API. 🚀
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { LocationInner } from './LocationInner';
import {
    LocationInnerFromJSON,
    LocationInnerFromJSONTyped,
    LocationInnerToJSON,
} from './LocationInner';

/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<LocationInner>}
     * @memberof ValidationError
     */
    loc: Array<LocationInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    msg: string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    type: string;
}

/**
 * Check if a given object implements the ValidationError interface.
 */
export function instanceOfValidationError(value: object): value is ValidationError {
    if (!('loc' in value) || value['loc'] === undefined) return false;
    if (!('msg' in value) || value['msg'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    return true;
}

export function ValidationErrorFromJSON(json: any): ValidationError {
    return ValidationErrorFromJSONTyped(json, false);
}

export function ValidationErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValidationError {
    if (json == null) {
        return json;
    }
    return {
        
        'loc': ((json['loc'] as Array<any>).map(LocationInnerFromJSON)),
        'msg': json['msg'],
        'type': json['type'],
    };
}

export function ValidationErrorToJSON(value?: ValidationError | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'loc': ((value['loc'] as Array<any>).map(LocationInnerToJSON)),
        'msg': value['msg'],
        'type': value['type'],
    };
}
