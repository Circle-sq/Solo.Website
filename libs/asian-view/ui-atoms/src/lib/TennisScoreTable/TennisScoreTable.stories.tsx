import type { Meta, StoryObj } from '@storybook/react';

import TennisScoreTable, { type TennisScoreData } from './TennisScoreTable';

const meta: Meta<typeof TennisScoreTable> = {
    title: 'Design System/Molecules/MuiTennisScoreTable',
    component: TennisScoreTable,
};

export default meta;
type Story = StoryObj<typeof TennisScoreTable>;

const scoreData: TennisScoreData = {
    points: [15, 30],
    games: [5, 4],
    sets: [2, 1],
    serving: [true, false],
};

export const FirstPlayerServing: Story = {
    args: {
        scoreData: scoreData,
    },
};

export const SecondPlayerServing: Story = {
    args: {
        scoreData: {
            ...scoreData,
            serving: [false, true],
        },
    },
};

export const FirstPlayerHasAdvantage: Story = {
    args: {
        scoreData: {
            ...scoreData,
            points: ['A', 15],
        },
    },
};

export const SecondPlayerHasAdvantage: Story = {
    args: {
        scoreData: {
            ...scoreData,
            points: [15, 'A'],
        },
    },
};

export const FirstPlayerWins: Story = {
    args: {
        scoreData: {
            ...scoreData,
            points: ['A', 0],
        },
    },
};
