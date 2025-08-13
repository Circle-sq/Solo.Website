import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { S_FilterButtonsContainer, S_FilterRadioItem } from './styled';

const options = [
    { label: 'All', value: 'all' },
    { label: 'Won', value: 'won' },
    { label: 'Lost', value: 'lost' },
    { label: 'Canceled', value: 'canceled' },
];

interface Option {
    label: string;
    value: string;
}

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
}

const FilterButtons = ({ value, onChange, options }: Props) => {
    return (
        <S_FilterButtonsContainer>
            {options.map(({ label, value: filterValue }) => (
                <S_FilterRadioItem key={filterValue}>
                    <input
                        type='radio'
                        name='status'
                        value={filterValue}
                        checked={filterValue === value}
                        onChange={() => onChange(filterValue)}
                    />
                    <span id={filterValue}>{label}</span>
                </S_FilterRadioItem>
            ))}
        </S_FilterButtonsContainer>
    );
};

const meta: Meta<typeof FilterButtons> = {
    title: 'Domain/FilterButtons',
    component: FilterButtons,
    args: {
        options,
        value: 'all',
    },
    parameters: {
        pseudo: {
            hover: ['#won'],
        },
        docs: { disable: true },
    },
};

export default meta;

type Story = StoryObj<typeof FilterButtons>;

const StatefulFilterButtons = (props: Props) => {
    const [status, setStatus] = useState(props.value);

    return (
        <div style={{ width: '370px' }}>
            <FilterButtons {...props} value={status} onChange={setStatus} />
        </div>
    );
};

export const OneButtonActiveAnotherHover: Story = {
    render: StatefulFilterButtons,
};

export const SameButtonActiveAndHover: Story = {
    render: StatefulFilterButtons,
    args: {
        ...meta.args,
        value: 'won',
    },
};
