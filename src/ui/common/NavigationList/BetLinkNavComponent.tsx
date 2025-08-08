import { Box } from '@mui/material';

import { GolfIcon } from '@solo-ui/icons/svg';

import { S_LinkLabel, NavigationLink } from './styled';

interface Props {
    label: string;
    onClick: () => void;
    testId: string;
}

const BetLinkNavComponent = (props: Props) => {
    const { onClick, label, ...linkProps } = props;

    return (
        <NavigationLink onClick={onClick} {...linkProps}>
            <Box
                sx={{
                    gap: '8px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <GolfIcon fontSize='small' />
                <S_LinkLabel>{label}</S_LinkLabel>
            </Box>
        </NavigationLink>
    );
};

export default BetLinkNavComponent;
