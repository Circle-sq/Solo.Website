import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';
import MessageBox from 'src/ui/common/MessageBox/MessageBox';

const MessageBoxWrapper = () => {
    const {
        messageBox: { messageForView, onClose },
    } = useAppStateContext();

    if (messageForView === null) {
        return null;
    }

    const { title, message } = messageForView;

    return <MessageBox title={title} message={message} onClose={onClose} />;
};

export default observer(MessageBoxWrapper);
