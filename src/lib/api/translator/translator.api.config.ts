/* eslint-disable @typescript-eslint/no-explicit-any */
import { Configuration, DefaultApi, ResponseError } from './generated';

class TranslateApi {
  public translateService: DefaultApi;

  constructor() {
    const BASE_URL = import.meta.env.VITE_TRANSLATOR_BASE_URL;
    const API_KEY = import.meta.env.VITE_TRANSLATOR_API_KEY;

    const configuration = new Configuration({
      basePath: BASE_URL,
      headers: {
        'X-API-KEY': API_KEY!,
      },
    });

    this.translateService = errorHandler(new DefaultApi(configuration));

    function errorHandler(service: any) {
      return new Proxy(service, {
        get: function (target, method) {
          if (typeof target[method] === 'function') {
            return async function (...values: any) {
              try {
                const result = await target[method](...values);
                return result;
              } catch (error) {
                if (error instanceof ResponseError) {
                  const ResponseError = await error.response.json();

                  //Error to be handled in special way:
                  switch (ResponseError.errorCode) {
                    default:
                      console.log(ResponseError);
                      break;
                  }
                }
              }
            };
          }

          return target[method];
        },
      });
    }
  }
}

const translateApi = new TranslateApi();
export default translateApi;
