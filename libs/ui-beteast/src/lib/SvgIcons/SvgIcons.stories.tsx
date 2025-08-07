import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Source } from '@storybook/blocks';
import type { Meta } from '@storybook/react';
import map from 'lodash/map';
import { type ElementType, Fragment } from 'react';

import * as Icons from '@sc-ui/icons/svg';

const iconEntries = Object.entries(Icons) as [string, ElementType][];

const fontSizes = {
    xsmall: '12px',
    small: '16px',
    medium: '20px',
    large: '24px',
};

const customColors = ['#007acc', '#606060', '#999999', '#bababa', '#d6d6d6'];

export const SvgIconsGrid = () => {
    return (
        <ThemeProvider theme={theme}>
            <Source
                dark
                code={`
import { AZIcon } from '@sc-ui/icons/svg';
// or
import { AZ as AZIcon } from '@sc-ui/icons/svg';

...
// Usage
<AZIcon fontSize="small" />
<AZIcon fontSize="small" color="red" />

`}
            />

            <Grid container spacing={2} className='svg-icons-grid'>
                <Grid item xs={2}>
                    <Box style={{ color: 'white' }}>Icon Name</Box>
                </Grid>
                <Grid item xs={1}>
                    <Box style={{ color: 'white', fontSize: 'small' }}>default</Box>
                </Grid>
                {map(customColors, (color) => (
                    <Grid item key={color} xs={1}>
                        <Box style={{ color: 'white', fontSize: 'small' }}>{color}</Box>
                    </Grid>
                ))}
                <Grid item xs={1}>
                    {Object.entries(fontSizes).map(([sizeName, sizeValue]) => (
                        <Box key={sizeName} style={{ color: 'white', fontSize: 'small' }}>
                            {sizeName === 'xsmall' ? 'xs' : sizeName[0]} <br />({sizeValue})
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={3} />
                {iconEntries.map(([iconName, IconComponent]) => (
                    <Fragment key={iconName}>
                        <Grid item xs={2}>
                            <Box style={{ color: 'white' }}>{iconName}</Box>
                        </Grid>
                        <Grid item xs={1}>
                            <IconComponent />
                        </Grid>
                        {map(customColors, (color) => (
                            <Grid item key={color} xs={1}>
                                <IconComponent color={color} />
                            </Grid>
                        ))}
                        <Grid item xs={1} sx={{ gap: 1 }}>
                            {Object.entries(fontSizes).map(([sizeName, sizeValue]) => (
                                <IconComponent key={sizeName} style={{ fontSize: sizeValue }} />
                            ))}
                        </Grid>
                        <Grid item xs={3}>
                            <Source code={`<${iconName} fontSize="small" />`} />
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
        </ThemeProvider>
    );
};

const theme = createTheme(); // Create a theme instance
const meta: Meta = {
    title: 'Atoms/SvgIcons',
};

export const SvgIcons = {
    render: () => {
        return <SvgIconsGrid />;
    },
};

export default meta;
