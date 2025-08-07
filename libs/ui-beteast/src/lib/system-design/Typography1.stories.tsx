import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { Meta } from '@storybook/react';

import { typographySamples } from './storybook-config';

const meta: Meta<typeof Typography> = {
    title: 'System Design/Typography',
    component: Typography,
};

export default meta;

export const Showcase = () => (
    <Box sx={{ padding: 2, backgroundColor: '#121212', color: '#ffffff' }}>
        {typographySamples.map((sample) => (
            <Box key={sample.styleName} sx={{ marginBottom: 2 }}>
                <Typography variant={sample.variant}>{`${sample.variant}: The quick brown fox`}</Typography>
            </Box>
        ))}
    </Box>
);

export const ShowcaseWithDetails = () => (
    <Box sx={{ padding: 2, backgroundColor: '#121212', color: '#ffffff' }}>
        <Grid container spacing={0}>
            <Grid item xs={3}>
                <Typography variant='h4' color='gray'>
                    Style name
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='h4' color='gray'>
                    variant, weight
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='h4' color='gray'>
                    size/height
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='h4' color='gray'>
                    Sample
                </Typography>
            </Grid>
        </Grid>
        {typographySamples.map((sample) => (
            <Grid container spacing={0} key={sample.styleName} sx={{ marginTop: 2 }}>
                <Grid item xs={3}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        {sample.styleName}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        {sample.variant}, {sample.fontWeight}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        {sample.fontSize} / {sample.lineHeight}
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        The quick brown fox
                    </Typography>
                </Grid>
            </Grid>
        ))}
    </Box>
);
