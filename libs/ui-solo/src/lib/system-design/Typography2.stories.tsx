import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Source } from '@storybook/blocks';
import type { Meta } from '@storybook/react';

import { typographySamples } from './storybook-config';

const meta: Meta<typeof Typography> = {
    title: 'System Design/Typography',
    component: Typography,
};

export default meta;

export const ShowcaseWithCode = () => (
    <Box sx={{ padding: 2, backgroundColor: '#121212', color: '#ffffff' }}>
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <Typography variant='h2' color='gray' sx={{ fontWeight: 'semibold' }}>
                    Style name
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant='h2' color='gray' sx={{ fontWeight: 'semibold' }}>
                    variant, weight
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant='h2' color='gray' sx={{ fontWeight: 'semibold' }}>
                    size/height
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant='h2' color='gray' sx={{ fontWeight: 'semibold' }}>
                    Sample
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography variant='h2' color='gray' sx={{ fontWeight: 'semibold' }}>
                    Code
                </Typography>
            </Grid>
        </Grid>
        {typographySamples.map((sample) => (
            <Grid container spacing={0} key={sample.styleName} sx={{ marginTop: 2 }}>
                <Grid item xs={2}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        {sample.styleName}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        {sample.variant}, {sample.fontWeight}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        {sample.fontSize} / {sample.lineHeight}
                    </Typography>
                </Grid>

                <Grid item xs={2}>
                    <Typography variant={sample.variant} sx={{ fontWeight: sample.fontWeight }}>
                        The quick brown fox
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Source
                        code={`<Typography variant="${sample.variant}" sx={{ fontWeight: ${sample.fontWeight} }}>The quick brown fox</Typography>`}
                        language='jsx'
                    />
                </Grid>
            </Grid>
        ))}
    </Box>
);
