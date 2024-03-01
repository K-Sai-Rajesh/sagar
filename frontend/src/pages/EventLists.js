import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, Grid } from '@mui/material';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const columns = [
    { id: 'event_id', label: 'Event ID' },
    { id: 'name', label: 'Name' },
    { id: 'image', label: 'Cover' },
    { id: 'date', label: 'Date' }
];

const rows = [
    {
        name: 'Sai',
        image: 'inactive',
        date: 'premium'
    }
];

export default function EventsTable(props) {
    // const { name, setOpen } = props
    const { events } = useSelector(state => state.AdminReducer)
    console.log(events)
    return (
        <Grid
            item
            xs={12}
            // border={'1px solid red'}
            my={2}
        >
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={6}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    Edit
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // eslint-disable-next-line
                                events.map((row, idx) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                            {columns.map((column) => {
                                                const value = row[column.id];

                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                    >
                                                        {
                                                            column.id === "image" ?
                                                                <>
                                                                    <Avatar
                                                                        component={Paper}
                                                                        elevation={9}
                                                                        src={value}
                                                                        sx={{
                                                                            width: 64,
                                                                            height: 64
                                                                        }}
                                                                    />
                                                                </>
                                                                :
                                                                column.id === "date" ?
                                                                    format(new Date(value), 'EEEE') + ", " + new Date(value).getDate() + " " + format(new Date(value), 'LLLL') + " " + new Date(value).getFullYear()
                                                                    :
                                                                    column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderColor: 'grey'
                                                    }}
                                                // onClick={() => setOpen(true)}
                                                >
                                                    <OfflineBoltIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}