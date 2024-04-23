import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import {
    AppBar,
    Box,
    CssBaseline, Divider,
    Drawer, IconButton, List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText, MenuList, Paper, Popover,
    Toolbar,
    Typography,
    MenuItem, Avatar, Tooltip, Menu, Collapse,
} from "@mui/material";


import MenuIcon from '@mui/icons-material/Menu';

import {ACCESS_TOKEN, MY_PERMISSIONS, PRIMARY_COLOR} from "../../utils/constants.js";

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import user from "../../assets/user.png"
import {Dashboard, ExpandLess, ExpandMore, Lock, StarBorder} from "@mui/icons-material";
import {useApolloClient} from "@apollo/client";
import {isLoggedInVar} from "../../store/cache.js";

import logo from '../../assets/logo.png'


const drawerWidth = 240;


const MainLayout = () => {

    const client = useApolloClient();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [openDrawer, setOpenDrawer] = React.useState(true);

    const toggleDrawer = () => {
        setOpenDrawer((prevState) => !prevState);
    };



    const logout = () => {
        //client.clearStore();
        client.cache.gc();
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(MY_PERMISSIONS);
        // Set the logged-in status to false
        isLoggedInVar(false);
    }

    const handleClose = async (code = "999") => {

        if(code === "000") {
            await logout()
        }

        setAnchorEl(null);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{
                backgroundColor: PRIMARY_COLOR,
                zIndex: (theme) => theme.zIndex.drawer + 1,

            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        WeCover
                    </Typography>

                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{width: 32, height: 32}} src={user} />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar/> Profile
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Lock fontSize="small"/>
                            </ListItemIcon>
                           Change Password
                        </MenuItem>
                        <MenuItem onClick={() => handleClose("000")}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    display: openDrawer ? "block" : "none",
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img style={{width: 120, padding: 20}} src={logo} />
                </div>
                
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton selected>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        {/*<ListItemButton onClick={null}>*/}
                        {/*    <ListItemIcon>*/}
                        {/*        <Settings />*/}
                        {/*    </ListItemIcon>*/}
                        {/*    <ListItemText primary="Settings" />*/}
                        {/*    {open ? <ExpandLess /> : <ExpandMore />}*/}
                        {/*</ListItemButton>*/}
                        {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
                        {/*    <List component="div" disablePadding>*/}
                        {/*        <ListItemButton sx={{ pl: 4 }}>*/}
                        {/*            <ListItemIcon>*/}
                        {/*                <StarBorder />*/}
                        {/*            </ListItemIcon>*/}
                        {/*            <ListItemText primary="Starred" />*/}
                        {/*        </ListItemButton>*/}
                        {/*    </List>*/}
                        {/*</Collapse>*/}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>

    )
}
export default MainLayout
