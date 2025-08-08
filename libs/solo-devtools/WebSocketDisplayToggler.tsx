import { useSubscriptionDevTool } from './hooks';
import { S_DevToolItem } from './styled';

export function WebSocketDisplayToggler() {
    const { show_socket_subscriptions, toggle: toggleSocketSubscriptionDisplay } = useSubscriptionDevTool();

    return (
        <S_DevToolItem>
            <label>
                <input type='checkbox' checked={show_socket_subscriptions} onChange={toggleSocketSubscriptionDisplay} />
                show WebSocket Subscriptions
            </label>
        </S_DevToolItem>
    );
}
