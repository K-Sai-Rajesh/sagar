import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Container, Grid, IconButton } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import EventCard from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { get_events } from '../../reducers/slices/AdminSlice';
import { format } from 'date-fns';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const columns = [
    { id: 'name', label: 'Name' },
    {
        id: 'date',
        label: 'Date',
        align: 'center',
    },
    {
        id: 'description',
        label: 'Description',
        align: 'right',
    },
];

export default function EventsList() {

    const { events, length } = useSelector(state => state.AdminReducer)
    const [displayEvents, setDispayEvents] = React.useState([])
    const [selected, setSelected] = React.useState(true)
    const [page, setPage] = React.useState(0);
    const dispatch = useDispatch()

    React.useEffect(() => {
        setDispayEvents(events)
    }, [events])

    React.useEffect(() => {
        const data = {
            skip: page,
            limit: 5
        }
        dispatch(get_events({ data }, { dispatch }))
    }, [page])


    return (
        <Container maxWidth='lg' component={Paper} elevation={7} sx={{ width: '100%', overflow: 'hidden' }}>
            <Box
                display={'flex'}
                justifyContent={'end'}
                p={2}
            >
                <IconButton
                    aria-label="delete"
                    color={selected ? 'primary' : ''}
                    onClick={() => setSelected(true)}
                >
                    <ReorderIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color={!selected ? 'primary' : ''}
                    onClick={() => setSelected(false)}
                >
                    <GridViewIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    disabled={page === 0 && true}
                    onClick={() => setPage(page - 5)}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                {

                    <IconButton
                        aria-label="delete"
                        disabled
                        size='small'
                    >
                        {page + 1}-{page + displayEvents.length}
                        /
                        {length}
                    </IconButton>
                }
                <IconButton
                    aria-label="delete"
                    disabled={page + 5 > length && true}
                    onClick={() => setPage(page + 5)}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
            <TableContainer sx={{ height: 370 }}>
                {
                    selected ?
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: 18 }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayEvents
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value =
                                                        column.id === 'description' ?
                                                            row[column.id]?.substring(0, 10) + '...' :
                                                            column.id === 'date' ?
                                                                `
                                                                ${format(new Date(row[column.id]), 'eeee')},
                                                                ${new Date(row[column.id]).getDate()}
                                                                ${format(new Date(row[column.id]), 'LLLL')},
                                                                ${new Date(row[column.id]).getFullYear()}
                                                                `
                                                                :
                                                                row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && column.id === 'description'
                                                                ? value.substring(0, 5)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                        :
                        <Grid container>
                            {
                                displayEvents
                                    .map((card) => {
                                        return (
                                            <>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    lg={4}
                                                    p={2}
                                                >
                                                    <EventCard card={card} />
                                                </Grid>
                                            </>
                                        );
                                    })
                            }
                        </Grid>

                }
            </TableContainer>
        </Container>
    );
}