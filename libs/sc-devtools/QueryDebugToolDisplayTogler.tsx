import { useQueryDebugTool } from './hooks';
import { S_DevToolItem } from './styled';

export function ReactQueryDevtoolsDisplayTogler() {
    const { query_debug_tool, toggle: toggleQueryDebugTool } = useQueryDebugTool();

    return (
        <S_DevToolItem>
            <label>
                <input type='checkbox' checked={query_debug_tool} onChange={toggleQueryDebugTool} />
                Show React Query Devtools
            </label>
        </S_DevToolItem>
    );
}
