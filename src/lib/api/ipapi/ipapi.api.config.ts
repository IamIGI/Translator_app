/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultApi, ResponseError } from './generated';

class IpapiApi {
  public ipapiService: DefaultApi;

  constructor() {
    // const configuration = new Configuration({
    //   basePath: BASE_URL,

    // });

    this.ipapiService = errorHandler(new DefaultApi());

    function errorHandler(service: any) {
      return new Proxy(service, {
        get: function (target, method) {
          if (typeof target[method] === 'function') {
            return async function (...values: any) {
              try {
                console.log(target[method]);
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

const ipapiApi = new IpapiApi();
export default ipapiApi;
