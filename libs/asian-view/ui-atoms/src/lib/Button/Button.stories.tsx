import type { Meta } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Design System/Atoms/Button',
};
export default meta;

export const Default = {
    args: {
        children: 'Default',
    },
};
