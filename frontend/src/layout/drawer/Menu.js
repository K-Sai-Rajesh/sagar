import { Badge, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import { useLocation, useNavigate } from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useSelector } from 'react-redux';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

export default function MenuList(props) {
    const { toggleDrawer } = props
    const navigate = useNavigate()
    const location = useLocation()
    const { Chats } = useSelector(state => state.ChatReducer)
    const [count, setCount] = useState(0)

    const { privilege } = useSelector(state => state.LoginReducer)

    const adminColumn = [
        {
            name: 'Admin',
            icon: <AdminPanelSettingsIcon />,
            path: '/admin'
        },
        {
            name: 'Users',
            icon: <PeopleIcon />,
            path: '/admin/users'
        },
        {
            name: 'Users',
            icon: <PersonAddAltIcon />,
            path: '/admin/add_user'
        },
        {
            name: "Event",
            icon: <DeveloperBoardIcon />,
            path: '/admin/events'
        }
    ]

    const columns = [
        {
            name: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard'
        },
        {
            name: "Chat",
            icon: <ChatIcon color='inherit' />,
            path: '/dashboard/chats'
        },
        {
            name: 'Friends',
            icon: <Diversity2Icon />,
            path: '/dashboard/friend'
        },
        {
            name: 'Edit',
            icon: <EditAttributesIcon />,
            path: '/dashboard/edit'
        }
    ]

    useEffect(() => {
        var count = 0
        Chats.forEach(chat => {
            if (chat?.status === 'unread') {
                console.log(chat)
                count++
            }
        })
        setCount(count)
    }, [Chats])

    return (
        <div>
            <Box
                sx={{ width: 180 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {/* eslint-disable-next-line */}
                <List sx={{ overflow: 'auto', height: window.innerHeight }}>
                    {
                        (privilege === 'admin' ? adminColumn : columns)
                            .map((text, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => navigate(text.path)}>
                                        <ListItemIcon sx={{ color: location.pathname === text.path && '#1976D2' }}>
                                            {
                                                text.name === "Chat" ?
                                                    <Badge badgeContent={count} color="primary">
                                                        {
                                                            text.icon
                                                        }
                                                    </Badge>
                                                    :
                                                    text.icon
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography>{text.name}</Typography>} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                </List>
            </Box>
        </div>
    )
}