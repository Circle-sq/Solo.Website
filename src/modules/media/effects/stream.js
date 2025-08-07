import map from 'lodash/map';
import { all, put, takeEvery } from 'redux-saga/effects';

import { DeviceType, StreamProviders } from 'src/common/enums';
import {
    GET_STREAM_URL_REQUEST,
    getStreamsError,
    getStreamsFinish,
    getStreamUrlError,
    getStreamUrlFinish,
    STREAM_GET_REQUEST,
    streamPushUpdate,
} from 'src/modules/media/actions/stream';
import { SPORT_TYPE } from 'src/utils/constants';
import { socketIoClientGeneral } from 'src/utils/socket-io/clients';
import { WsChannel } from 'src/utils/socket-io/enums';

import * as service from '../services/stream';

export const remapESoccerStreams = (streams) =>
    map(streams, (stream) => {
        if (stream.sportId === SPORT_TYPE.esoccer) {
            return {
                ...stream,
                sportId: SPORT_TYPE.football,
            };
        }

        return stream;
    });

const getStreams = () =>
    function* () {
        try {
            let streams = yield service.getStreams();
            streams = remapESoccerStreams(streams);

            yield put(getStreamsFinish(streams));
        } catch (e) {
            yield put(getStreamsError(e));
        }
    };

const getStreamUrl = () =>
    function* ({ videoStream }) {
        try {
            switch (videoStream.provider) {
                case StreamProviders.Perform: {
                    const performStreamUrl = yield service.getPerformStreamUrl({
                        id: videoStream.streamId,
                    });

                    yield put(getStreamUrlFinish(performStreamUrl.url));

                    break;
                }

                case StreamProviders.Img: {
                    const token = yield service.getImgStreamToken({ id: videoStream.streamId });
                    const imgStreamUrl = yield service.getImgStreamUrl(
                        token.streamId,
                        token.auth,
                        token.timestamp,
                        token.operatorId,
                        videoStream.img_api_url,
                    );

                    yield put(getStreamUrlFinish(imgStreamUrl.hlsUrl));

                    break;
                }

                case StreamProviders.BetRadar: {
                    const { provider, streamId: id, deviceType } = videoStream;

                    const currentDevice = deviceType === DeviceType.TABLET ? DeviceType.MOBILE : deviceType;

                    const streamUrl = yield service.getBetradarStreamUrl({
                        id,
                        provider,
                        deviceType: currentDevice.toLowerCase(),
                    });

                    yield put(getStreamUrlFinish(streamUrl.url));

                    break;
                }

                case StreamProviders.GLive: {
                    const gLiveStreamUrl = yield service.getGLiveStreamUrl({
                        id: videoStream.streamId,
                    });

                    yield put(getStreamUrlFinish(gLiveStreamUrl.url));

                    break;
                }

                case StreamProviders.BetGenius: {
                    const betGeniusStreamUrl = yield service.getBetGeniusStreamUrl({
                        id: videoStream.streamId,
                        deviceType: videoStream.deviceType,
                    });

                    yield put(getStreamUrlFinish(`${betGeniusStreamUrl.url}?${betGeniusStreamUrl.token}`));

                    break;
                }

                case StreamProviders.Bayes: {
                    const bayesStreamUrl = yield service.getBayesStreamUrl({
                        id: videoStream.streamId,
                    });

                    yield put(getStreamUrlFinish(bayesStreamUrl));

                    break;
                }

                default: {
                    yield put(getStreamUrlError({}));
                }
            }
        } catch (e) {
            yield put(getStreamUrlError(e));
        }
    };

const handleStreamPush = () => {
    return function* () {
        const clientIo = yield socketIoClientGeneral;

        let resolve;

        clientIo?.socket.subscribe(WsChannel.Stream, ({ body }) => resolve(body));

        while (true) {
            const { event, streams } = yield new Promise((nextResolve) => {
                resolve = nextResolve;
            });

            yield put(streamPushUpdate(event.id, streams));
        }
    };
};

const getEventStreams = () =>
    function* () {
        yield all([
            yield takeEvery(STREAM_GET_REQUEST, getStreams()),
            yield takeEvery(GET_STREAM_URL_REQUEST, getStreamUrl()),
        ]);
    };

export default function init(saga) {
    return [saga.run(getEventStreams()), saga.run(handleStreamPush())];
}
