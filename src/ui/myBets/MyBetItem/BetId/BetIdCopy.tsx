import { S_BetIdCopyIcon } from './styled';

const BetIdCopy = ({ betId, setCopiedLabelActive }: { betId: string; setCopiedLabelActive: () => void }) => {
    const copyToClipboard = () => {
        const el = document.createElement('textarea');

        el.value = betId;

        document.body.appendChild(el);

        el.select();

        document.execCommand('copy');

        document.body.removeChild(el);
    };

    const copyBetslipID = () => {
        copyToClipboard();
        setCopiedLabelActive();
    };

    return <S_BetIdCopyIcon data-testid='copyBetId' className='theme-copy-clipboard' onClick={copyBetslipID} />;
};

export default BetIdCopy;
