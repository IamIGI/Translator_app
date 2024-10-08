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
/**
 * 
 * @export
 * @interface LocationInner
 */
export interface LocationInner {
}

/**
 * Check if a given object implements the LocationInner interface.
 */
export function instanceOfLocationInner(value: object): value is LocationInner {
    return true;
}

export function LocationInnerFromJSON(json: any): LocationInner {
    return LocationInnerFromJSONTyped(json, false);
}

export function LocationInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationInner {
    return json;
}

export function LocationInnerToJSON(value?: LocationInner | null): any {
    return value;
}

