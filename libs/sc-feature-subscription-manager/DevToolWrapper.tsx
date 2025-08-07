import {
    Close as CloseIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    KeyboardArrowRight,
    Wifi as WifiIcon,
    WifiOff as WifiOffIcon,
} from '@mui/icons-material';
import {
    Box,
    colors,
    FormControlLabel,
    IconButton,
    Paper,
    Stack,
    Switch,
    type SxProps,
    type Theme,
    Typography,
} from '@mui/material';
import { type PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { useLocalStorage } from 'usehooks-ts';

import { useSubscriptionDevTool, useWebsocketLogsDevTool } from '@sc-devtools/hooks';

import useGeneralSocket from 'src/utils/socket-io/hooks/useGeneralSocket';

interface Position {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

interface State {
    expanded: boolean;
}

type Layout = Position & Size & State;

const HEADER_HEIGHT = 48;

const DEFAULT_X = 10;
const DEFAULT_Y = 10;
const DEFAULT_WIDTH = 384;
const DEFAULT_HEIGHT = 448;

const rootStyles: SxProps<Theme> = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2000,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
    borderColor: 'divider',

    '.react-resizable': {
        position: 'relative',
        overflow: 'hidden',
    },
};

const headerStyles: SxProps<Theme> = {
    px: 1.5,
    py: 1,
    userSelect: 'none',
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const contentStyles: SxProps<Theme> = {
    overflow: 'auto',
    height: '100%',
    padding: 1.5,
};

const actionButtonStyles: SxProps<Theme> = {
    width: 32,
    height: 32,
    backgroundColor: colors.grey['700'],

    '&:hover': {
        backgroundColor: colors.grey['600'],
    },
};

const connectedButtonStyles: SxProps<Theme> = {
    width: 32,
    height: 32,
    color: colors.green['700'],

    '&:hover': {
        backgroundColor: colors.green['200'],
    },
};

const disconnectedButtonStyles: SxProps<Theme> = {
    width: 32,
    height: 32,
    color: colors.red['700'],

    '&:hover': {
        backgroundColor: colors.red['200'],
    },
};

const resizeHandleStyles: SxProps<Theme> = {
    position: 'absolute',
    bottom: -2.5,
    right: -2.5,
    width: 24,
    height: 24,
    cursor: 'nwse-resize',
};

interface Props {
    inline: boolean;
    onPause?: (channel: string) => void;
    onResume?: (channel: string) => void;
    paused?: (channel: string) => boolean;
}

export function DevToolWrapper({ inline, children }: PropsWithChildren<Props>) {
    const socketIOClient = useGeneralSocket();
    const nodeRef = useRef<HTMLDivElement>(null);

    const { show_socket_subscriptions, show_logs, toggle: closeToolbar, toggleLogs } = useSubscriptionDevTool();
    const { show_socket_logs, toggle: toggleSystemLogs } = useWebsocketLogsDevTool();

    const [layout, setLayout] = useLocalStorage<Layout>(
        'subscriptions-inspector-layout',
        {
            expanded: false,
            x: DEFAULT_X,
            y: DEFAULT_Y,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
        },
        {
            deserializer: (value) => {
                try {
                    const { x, y, width, height, expanded } = JSON.parse(value) as Layout;

                    const adjustedWidth = Math.min(width, window.innerWidth);
                    const adjustedHeight = Math.min(height, window.innerHeight - HEADER_HEIGHT);
                    const adjustedX = Math.max(0, Math.min(x, window.innerWidth - adjustedWidth));
                    const adjustedY = Math.max(0, Math.min(y, window.innerHeight - adjustedHeight));

                    return {
                        x: adjustedX,
                        y: adjustedY,
                        width: adjustedWidth,
                        height: adjustedHeight,
                        expanded,
                    };
                } catch {
                    return {
                        x: DEFAULT_X,
                        y: DEFAULT_Y,
                        width: DEFAULT_WIDTH,
                        height: DEFAULT_HEIGHT,
                        expanded: inline ?? false,
                    };
                }
            },
        },
    );

    const [isConnected, setIsConnected] = useState(socketIOClient?.connected ?? false);

    const handleSavePosition = useCallback(
        (data: Position) => {
            setLayout((prev) => ({ ...prev, ...data }));
        },
        [setLayout],
    );

    const handleToggleExpand = useCallback(() => {
        setLayout((prev) => ({ ...prev, expanded: !prev.expanded }));
    }, [setLayout]);

    const handleSaveSize = useCallback(
        (data: Size) => {
            setLayout((prev) => ({ ...prev, ...data }));
        },
        [setLayout],
    );

    const handleToggleConnect = useCallback(() => {
        if (socketIOClient === null) {
            return;
        }

        if (socketIOClient.connected) {
            socketIOClient.disconnect();
        } else {
            socketIOClient.connect();
        }
    }, [socketIOClient]);

    useEffect(() => {
        setIsConnected(socketIOClient?.connected ?? false);
    }, [socketIOClient?.connected]);

    if (!show_socket_subscriptions) {
        return null;
    }

    if (inline) {
        return <>{children}</>;
    }

    const wifiIconStyles = isConnected ? connectedButtonStyles : disconnectedButtonStyles;
    const isExpanded = layout.expanded;

    return (
        <Draggable
            bounds='parent'
            handle='.drag-handle'
            nodeRef={nodeRef}
            defaultPosition={{ x: layout.x, y: layout.y }}
            onStop={(_, data) => {
                handleSavePosition({ x: data.x, y: data.y });
            }}
        >
            <Paper ref={nodeRef} elevation={5} sx={rootStyles}>
                <Stack
                    className='drag-handle'
                    direction='row'
                    spacing={2}
                    sx={{
                        ...headerStyles,
                        backgroundColor: isConnected ? colors.green['100'] : colors.red['100'],
                        color: isConnected ? colors.green['900'] : colors.red['900'],
                    }}
                >
                    <Typography variant='h2' title='WebSockets Inspector'>
                        {isExpanded ? 'WebSockets Inspector' : 'WSM'}
                    </Typography>

                    <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                        <IconButton
                            size='small'
                            sx={wifiIconStyles}
                            onClick={handleToggleConnect}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            {isConnected ? <WifiIcon fontSize='inherit' /> : <WifiOffIcon fontSize='inherit' />}
                        </IconButton>
                        <IconButton
                            size='small'
                            sx={actionButtonStyles}
                            onClick={handleToggleExpand}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            {isExpanded ? <ExpandLessIcon fontSize='inherit' /> : <ExpandMoreIcon fontSize='inherit' />}
                        </IconButton>
                        <IconButton
                            size='small'
                            sx={actionButtonStyles}
                            onClick={closeToolbar}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <CloseIcon fontSize='inherit' />
                        </IconButton>
                    </Stack>
                </Stack>

                {isExpanded && (
                    <ResizableBox
                        width={layout.width}
                        height={layout.height}
                        minConstraints={[DEFAULT_WIDTH, DEFAULT_HEIGHT]}
                        maxConstraints={[window.innerWidth - layout.x, window.innerHeight - HEADER_HEIGHT - layout.y]}
                        onResizeStop={(_, data) => handleSaveSize(data.size)}
                        handle={(_, ref) => (
                            <Box ref={ref} component='span' sx={resizeHandleStyles}>
                                <KeyboardArrowRight sx={{ rotate: '45deg', color: 'black' }} />
                            </Box>
                        )}
                    >
                        <Stack spacing={1} sx={{ ...contentStyles }}>
                            <Stack direction='column' spacing={1}>
                                <FormControlLabel
                                    sx={{ alignItem: 'baseline' }}
                                    control={<Switch color='success' checked={show_logs} onChange={toggleLogs} />}
                                    label='Subscription logs (refresh to take effect)'
                                />
                                <FormControlLabel
                                    sx={{ alignItem: 'baseline' }}
                                    control={
                                        <Switch
                                            color='success'
                                            checked={show_socket_logs}
                                            onChange={toggleSystemLogs}
                                        />
                                    }
                                    label='System logs (refresh to take effect)'
                                />
                            </Stack>
                            {children}
                        </Stack>
                    </ResizableBox>
                )}
            </Paper>
        </Draggable>
    );
}
