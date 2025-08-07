import { Table, TableBody, TableCell, TableRow, Typography, TableFooter } from '@mui/material';

import ServingIndicator from './ServingIndicator';

export type Point = 0 | 15 | 30 | 40 | 'A';
export interface TennisScoreData {
    points: Point[];
    games: number[];
    sets: number[];
    serving: boolean[];
}

function TennisScoreTable({ scoreData }: { scoreData: TennisScoreData }) {
    return (
        <Table aria-label='tennis score table' size='small' padding='none' sx={{ maxWidth: '50px' }}>
            <TableBody>
                {scoreData.points.map((_, index) => (
                    <TableRow key={index}>
                        <TableCell align='center' sx={{ border: 0, padding: '6px', width: '1%' }}>
                            <ServingIndicator serving={scoreData.serving[index]} />
                        </TableCell>
                        <TableCell align='center' sx={{ border: 0, padding: '6px' }}>
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                {scoreData.points[index]}
                            </Typography>
                        </TableCell>
                        <TableCell align='center' sx={{ border: 0, padding: '6px' }}>
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                {scoreData.games[index]}
                            </Typography>
                        </TableCell>
                        <TableCell
                            align='center'
                            sx={{
                                borderLeft: 1,
                                borderColor: 'divider',
                                border: 0,
                                '&:last-of-type': {
                                    borderLeft: '1px solid',
                                },
                                padding: '6px',
                            }}
                        >
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                {scoreData.sets[index]}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell align='center' sx={{ border: 0, padding: '6px' }} />
                    <TableCell align='center' sx={{ border: 0, padding: '6px', typography: 'body2' }}>
                        P
                    </TableCell>
                    <TableCell align='center' sx={{ border: 0, padding: '6px' }}>
                        <Typography variant='body2'>G</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ border: 0, padding: '6px' }}>
                        <Typography variant='body2'>S</Typography>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default TennisScoreTable;
