import * as t from 'io-ts';
import { buildValidator } from '@solo-webapi/mobx-utils/buildValidator';
import type { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';
import type { ConfigServer } from '../ConfigServer';

const ok = 200;
const forbidden = 403;
const HealthCheckResponseIO = t.union([
    t.type({
        status: t.literal(ok),
        bodyJson: t.type({
            isOk: t.boolean,
        }),
    }),
    t.type({
        status: t.literal(forbidden),
    }),
]);

type HealthCheckResponseType =
    | {
          status: typeof ok;
          bodyJson: {
              isOk: boolean;
          };
      }
    | {
          status: typeof forbidden;
      };

const decodeHealthCheckResponseType = buildValidator<HealthCheckResponseType>(
    'HealthCheckResponse',
    HealthCheckResponseIO,
    true,
);

export const healthCheck = async (config: ConfigServer, platformApi: PlatformApi): Promise<boolean> => {
    const extraHeaders = {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
    };

    const params = {
        url: `${config.API_URL}/accounts-api/meta/health`,
        decode: decodeHealthCheckResponseType,
        extraHeaders: extraHeaders,
    };

    const result = await platformApi.fetchGetWithoutToken(params);

    console.info(`${config.API_URL}/accounts-api/meta/health`);

    if (result.status === ok) {
        return result.bodyJson.isOk;
    }

    return false;
};
