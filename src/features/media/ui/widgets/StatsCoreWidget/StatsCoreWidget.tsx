import { useEffect, useRef, useState } from 'react';

import { useThemeSwitchContext, ThemeNames } from '@solo-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { errorStyles } from './styled';

interface StatsCoreWidgetProps {
    eventId: string;
    language: string;
}

interface WidgetRef {
    on(event: string, callback: (e: Record<string, string>) => void): void;

    destroy(): void;
}

const StatsCoreWidget = ({ eventId, language }: StatsCoreWidgetProps) => {
    const widgetRef = useRef<WidgetRef | null | void>(null);
    const widgetContainerRef = useRef<HTMLDivElement | null>(null);
    const [hasError, setHasError] = useState(false);

    const { themeName } = useThemeSwitchContext();

    const configurationId = themeName === ThemeNames.Neon ? '67becc2fbfc47c36f721c3af' : '67becafa74acb8b1c6528a79';

    useEffect(() => {
        if (window.STATSCOREWidgets) {
            window.STATSCOREWidgets.onLoad((err) => {
                if (err) {
                    switch (err.type) {
                        case 'NetworkError':
                            console.error('Network error occurred.');

                            break;

                        case 'BrowserNotSupported':
                            console.error('Browser is not supported.');

                            break;

                        default:
                            console.error('An unknown error occurred.');
                    }

                    return;
                }

                const element = document.getElementById('statsCoreWidget');
                const inputData = { eventId: `m:${eventId}`, language };
                const options = {};

                widgetRef.current = new window.STATSCOREWidgets.WidgetGroup(
                    element,
                    configurationId,
                    inputData,
                    options,
                );
            });
        }

        if (widgetRef.current && typeof widgetRef.current.on === 'function') {
            widgetRef.current.on('error', (e: Record<string, string>) => {
                if (e.message) {
                    if (widgetContainerRef.current) {
                        widgetContainerRef.current.innerHTML = '';
                        widgetContainerRef.current = null;
                    }

                    setHasError(true);
                }
            });
        }

        return () => {
            if (widgetRef.current) {
                widgetRef.current.destroy();
                widgetRef.current = null;
            }
        };
    }, [eventId, language]);

    return (
        <div
            id='statsCoreWidget'
            ref={widgetContainerRef}
            data-testid='statsCoreWidgetContainer'
            style={hasError ? errorStyles : undefined}
        >
            {hasError && <I18n langKey='media.lmt.statsCoreWidget.error' defaultText='Widget could not be loaded.' />}
        </div>
    );
};

export default StatsCoreWidget;
