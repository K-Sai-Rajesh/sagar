import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button } from '@mui/material';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { useSelector } from 'react-redux';

const columns = [
    { id: 'first_name', label: 'Name', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'subscription', label: 'Subscription' },
    { id: 'pro_pic', label: 'Profile' },
    { id: 'user_id', label: 'User Id' },
    { id: 'validity', label: 'Validity' }
];

const rows = [
    {
        name: 'Sai',
        status: 'inactive',
        sub: 'premium',
        phone_number: 78364,
        validity: 20,
    }
];

export default function UsersTable(props) {
    const { name, setOpen } = props
    const { profiles } = useSelector(state => state.UserReducer)
    console.log(profiles)

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align='center'
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell align='center'>
                                Recharge
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            // eslint-disable-next-line
                            profiles.map((row, idx) => {
                                if (name === '')
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align='center'>
                                                        {
                                                            column.id === 'pro_pic' ?
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
                                                                column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align='center'>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderColor: 'grey'
                                                    }}
                                                    onClick={() => setOpen(true)}
                                                >
                                                    <OfflineBoltIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                else if (row.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align='center'>
                                                        {
                                                            column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align='center'>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderColor: 'grey'
                                                    }}
                                                    onClick={() => { setOpen(true); console.log('true') }}
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
    );
}