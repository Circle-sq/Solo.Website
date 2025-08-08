import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Source } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import keys from 'lodash/keys';

import { Icon, config } from '@solo-ui/beteast/icons';

const meta: Meta<typeof Icon> = {
    title: 'Atoms/Icons',
    component: Icon,
    argTypes: {
        testId: {
            description: 'Optional you can specify test id for the icon',
            control: {
                type: 'text',
            },
        },
        name: {
            description: 'The name of the icon',
            options: keys(config),
            control: {
                type: 'select',
            },
        },
        color: {
            description: 'The color of the icon',
            options: ['red', 'gray', 'white'],
            control: {
                type: 'select',
            },
        },
    },
};

type Story = StoryObj<typeof Icon>;

const colorOptions = {
    Red: 'red',
    Blue: 'blue',
    Green: 'green',
    // Add more colors as needed
};

const iconOptions = keys(config);

export const AnIcon: StoryObj<typeof Icon> = {
    args: {
        color: colorOptions.Red, // Default color
        name: iconOptions[0], // Default icon
    },
    render: (args) => (
        <>
            <Icon {...args} />
            <Source code={`<Icon color="${args.color}" name="${args.name}" />`} dark />
        </>
    ),
};

export const GrayIcons: Story = {
    render: () => {
        const sortedIconNames = Object.keys(config).sort();

        return (
            <Grid container spacing={2}>
                {sortedIconNames.map((iconName) => (
                    <Grid size={2} key={iconName}>
                        <div style={{ textAlign: 'center', color: 'gray' }}>
                            <Icon name={iconName} color='gray' />
                            <Typography variant='body4'> {iconName}</Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
        );
    },
};

export default meta;
