import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { RequestStatus, StreamProviders } from 'src/common/enums';

import MediaStreamPlayer from './MediaStreamPlayer';

let originalLoad: () => void;

beforeAll(() => {
    originalLoad = window.HTMLMediaElement.prototype.load;

    Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
        configurable: true,
        value: vi.fn(),
    });
});

afterAll(() => {
    window.HTMLMediaElement.prototype.load = originalLoad;
});

describe('MediaStreamPlayer', () => {
    const props = {
        streamUrl: 'https://example.com/stream',
        streamUrlState: RequestStatus.Ready,
        streamProvider: StreamProviders.Perform,
        isAuthenticated: true,
        isAutoPlay: true,
        mediaIsPlayingVideo: true,
        setIsAutoPlay: vi.fn(),
        setMediaIsPlayingVideo: vi.fn(),
    };

    const setupPlayer = vi.fn().mockReturnValue({
        play: {
            subscribe: vi.fn(),
        },
        pause: {
            subscribe: vi.fn(),
        },
        remove: vi.fn(),
    });

    window.avvpl = {
        setupPlayer,
    };

    it('should render MediaStreamPlayer component', function () {
        const { getByTestId } = renderWithAppWrapper(<MediaStreamPlayer {...props} />);
        const mediaPlayer = getByTestId('media-player');

        expect(mediaPlayer).toBeInTheDocument();
    });

    it('should render the Bet-Radar player', function () {
        const mediaPlayerProps = { ...props, streamProvider: StreamProviders.Img };

        const { getByTestId } = renderWithAppWrapper(<MediaStreamPlayer {...mediaPlayerProps} />);
        const betRadarPlayer = getByTestId('bet-radar-player');

        expect(betRadarPlayer).toBeInTheDocument();
    });

    it('should render the G-Live player', function () {
        const mediaPlayerProps = { ...props, streamProvider: StreamProviders.GLive };

        const { getByTestId } = renderWithAppWrapper(<MediaStreamPlayer {...mediaPlayerProps} />);
        const gLivePlayer = getByTestId('glive-player');

        expect(gLivePlayer).toBeInTheDocument();
    });

    it('should render default screen when the stream is not available', function () {
        const mediaPlayerProps = { ...props, streamUrl: '' };

        const { getByTestId } = renderWithAppWrapper(<MediaStreamPlayer {...mediaPlayerProps} />);
        const defaultPlayerScreen = getByTestId('media-player-error');

        expect(defaultPlayerScreen).toBeInTheDocument();
    });

    it('should render Bayes Player', function () {
        const mediaPlayerProps = { ...props, streamProvider: StreamProviders.Bayes };
        const { getByTestId } = renderWithAppWrapper(<MediaStreamPlayer {...mediaPlayerProps} />);

        expect(getByTestId('bayes-player')).toBeInTheDocument();
    });
});
