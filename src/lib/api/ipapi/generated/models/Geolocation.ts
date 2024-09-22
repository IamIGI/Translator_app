/* tslint:disable */
/* eslint-disable */
/**
 * ipapi.co IP Geolocation API
 * This API provides IP address-based geolocation data, including city, region, country, latitude, longitude, and other related details.
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
 * @interface Geolocation
 */
export interface Geolocation {
    /**
     * The IP address of the client or the requested IP.
     * @type {string}
     * @memberof Geolocation
     */
    ip?: string;
    /**
     * City where the IP address is located.
     * @type {string}
     * @memberof Geolocation
     */
    city?: string;
    /**
     * Region or state name.
     * @type {string}
     * @memberof Geolocation
     */
    region?: string;
    /**
     * Code of the region or state.
     * @type {string}
     * @memberof Geolocation
     */
    regionCode?: string;
    /**
     * Two-letter country code (ISO Alpha-2).
     * @type {string}
     * @memberof Geolocation
     */
    country?: string;
    /**
     * Full name of the country.
     * @type {string}
     * @memberof Geolocation
     */
    countryName?: string;
    /**
     * Three-letter country code (ISO Alpha-3).
     * @type {string}
     * @memberof Geolocation
     */
    countryCodeIso3?: string;
    /**
     * Capital of the country.
     * @type {string}
     * @memberof Geolocation
     */
    countryCapital?: string;
    /**
     * Country top-level domain.
     * @type {string}
     * @memberof Geolocation
     */
    countryTld?: string;
    /**
     * Continent code where the country is located.
     * @type {string}
     * @memberof Geolocation
     */
    continentCode?: string;
    /**
     * Indicates if the country is part of the European Union.
     * @type {boolean}
     * @memberof Geolocation
     */
    inEu?: boolean;
    /**
     * Postal code of the location.
     * @type {string}
     * @memberof Geolocation
     */
    postal?: string;
    /**
     * Latitude of the location.
     * @type {number}
     * @memberof Geolocation
     */
    latitude?: number;
    /**
     * Longitude of the location.
     * @type {number}
     * @memberof Geolocation
     */
    longitude?: number;
    /**
     * Timezone of the location.
     * @type {string}
     * @memberof Geolocation
     */
    timezone?: string;
    /**
     * UTC offset of the timezone.
     * @type {string}
     * @memberof Geolocation
     */
    utcOffset?: string;
    /**
     * International country calling code.
     * @type {string}
     * @memberof Geolocation
     */
    countryCallingCode?: string;
    /**
     * Currency used in the country.
     * @type {string}
     * @memberof Geolocation
     */
    currency?: string;
    /**
     * Full name of the currency.
     * @type {string}
     * @memberof Geolocation
     */
    currencyName?: string;
    /**
     * Languages spoken in the country.
     * @type {string}
     * @memberof Geolocation
     */
    languages?: string;
    /**
     * Total area of the country in square kilometers.
     * @type {number}
     * @memberof Geolocation
     */
    countryArea?: number;
    /**
     * Population of the country.
     * @type {number}
     * @memberof Geolocation
     */
    countryPopulation?: number;
    /**
     * Autonomous System Number (ASN) of the IP address.
     * @type {string}
     * @memberof Geolocation
     */
    asn?: string;
    /**
     * Organization associated with the IP address.
     * @type {string}
     * @memberof Geolocation
     */
    org?: string;
}

/**
 * Check if a given object implements the Geolocation interface.
 */
export function instanceOfGeolocation(value: object): value is Geolocation {
    return true;
}

export function GeolocationFromJSON(json: any): Geolocation {
    return GeolocationFromJSONTyped(json, false);
}

export function GeolocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Geolocation {
    if (json == null) {
        return json;
    }
    return {
        
        'ip': json['ip'] == null ? undefined : json['ip'],
        'city': json['city'] == null ? undefined : json['city'],
        'region': json['region'] == null ? undefined : json['region'],
        'regionCode': json['region_code'] == null ? undefined : json['region_code'],
        'country': json['country'] == null ? undefined : json['country'],
        'countryName': json['country_name'] == null ? undefined : json['country_name'],
        'countryCodeIso3': json['country_code_iso3'] == null ? undefined : json['country_code_iso3'],
        'countryCapital': json['country_capital'] == null ? undefined : json['country_capital'],
        'countryTld': json['country_tld'] == null ? undefined : json['country_tld'],
        'continentCode': json['continent_code'] == null ? undefined : json['continent_code'],
        'inEu': json['in_eu'] == null ? undefined : json['in_eu'],
        'postal': json['postal'] == null ? undefined : json['postal'],
        'latitude': json['latitude'] == null ? undefined : json['latitude'],
        'longitude': json['longitude'] == null ? undefined : json['longitude'],
        'timezone': json['timezone'] == null ? undefined : json['timezone'],
        'utcOffset': json['utc_offset'] == null ? undefined : json['utc_offset'],
        'countryCallingCode': json['country_calling_code'] == null ? undefined : json['country_calling_code'],
        'currency': json['currency'] == null ? undefined : json['currency'],
        'currencyName': json['currency_name'] == null ? undefined : json['currency_name'],
        'languages': json['languages'] == null ? undefined : json['languages'],
        'countryArea': json['country_area'] == null ? undefined : json['country_area'],
        'countryPopulation': json['country_population'] == null ? undefined : json['country_population'],
        'asn': json['asn'] == null ? undefined : json['asn'],
        'org': json['org'] == null ? undefined : json['org'],
    };
}

export function GeolocationToJSON(value?: Geolocation | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'ip': value['ip'],
        'city': value['city'],
        'region': value['region'],
        'region_code': value['regionCode'],
        'country': value['country'],
        'country_name': value['countryName'],
        'country_code_iso3': value['countryCodeIso3'],
        'country_capital': value['countryCapital'],
        'country_tld': value['countryTld'],
        'continent_code': value['continentCode'],
        'in_eu': value['inEu'],
        'postal': value['postal'],
        'latitude': value['latitude'],
        'longitude': value['longitude'],
        'timezone': value['timezone'],
        'utc_offset': value['utcOffset'],
        'country_calling_code': value['countryCallingCode'],
        'currency': value['currency'],
        'currency_name': value['currencyName'],
        'languages': value['languages'],
        'country_area': value['countryArea'],
        'country_population': value['countryPopulation'],
        'asn': value['asn'],
        'org': value['org'],
    };
}
