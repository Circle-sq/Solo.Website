import { useWebsocketLogsDevTool } from './hooks';
import { S_DevToolItem } from './styled';

export const WebSocketLogsToggler = () => {
    const { show_socket_logs, toggle: toggleSocketLogs } = useWebsocketLogsDevTool();

    return (
        <S_DevToolItem>
            <label>
                <input type='checkbox' checked={show_socket_logs} onChange={toggleSocketLogs} />
                show WebSocket Logs
            </label>
        </S_DevToolItem>
    );
};
