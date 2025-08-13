import type { Meta, StoryObj } from '@storybook/react';

import StakeInput from './StakeInput';

const meta: Meta<typeof StakeInput> = {
    title: 'Atoms/StakeInput',
    component: StakeInput,
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'The current value of the stake input.',
        },
        onChange: {
            action: 'changed',
            description: 'The function that is called every time the value from the input is changed',
        },
        onClick: {
            action: 'clicked',
            description: 'The function that is called when the input si clicked (it is showing numpad)',
        },
        maxLength: {
            control: 'number',
            description: 'This defines the maximum length of the input value',
        },
        disabled: {
            control: 'boolean',
            description: 'This controls the input if it is disabled or not',
        },
        className: {
            control: 'text',
            description:
                'Here it can be sent the classes that can style the input. (ex. The error one from Has Error story)',
        },
        placeholder: {
            control: 'text',
            description: 'The placeholder that is displayed when no value is inserted in input.',
        },
        'data-testid': {
            control: 'text',
            description: 'A unique identifier for the StakeInput component.',
        },
    },
};

type Story = StoryObj<typeof StakeInput>;

export const Disabled: Story = {
    args: {
        disabled: true,
        value: '10,000',
    },
};

export const Placeholder_Stake: Story = {
    args: {
        placeholder: 'Stake',
    },
};

export const MaxLength_5: Story = {
    args: {
        value: '12,345',
        maxLength: 5,
    },
};

export const Value_10000: Story = {
    args: {
        value: '10,000',
    },
};

export const WithError: Story = {
    args: {
        value: '10,000,001',
        maxLength: 11,
        error: true,
    },
};

export default meta;
