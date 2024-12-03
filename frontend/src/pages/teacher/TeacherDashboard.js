import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute' sx={styles.appBarStyled}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                transition: '0.3s ease',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}
                        >
                            Teacher Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={open ? styles.drawerStyled : styles.hideDrawer}
                >
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon sx={{ color: theme.palette.primary.main }} />
                        </IconButton>
                    </Toolbar>
                    <Divider sx={styles.dividerStyled} />
                    <List component="nav">
                        <TeacherSideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<TeacherHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                        <Route path="/Teacher/profile" element={<TeacherProfile />} />
                        <Route path="/Teacher/complain" element={<TeacherComplain />} />
                        <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                        <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                        <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default TeacherDashboard;

const styles = {
    appBarStyled: {
        backgroundColor: '#1976d2', // A deep blue for the app bar
        zIndex: theme => theme.zIndex.drawer + 1,
        transition: '0.3s ease',
    },
    boxStyled: {
        backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: '16px',
        transition: '0.3s ease',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
        backgroundColor: '#1976d2',
    },
    drawerStyled: {
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#263238', // A dark color for the drawer
            color: '#fff',
            transition: '0.3s ease',
        },
    },
    hideDrawer: {
        display: 'none',
        '@media (max-width: 600px)': {
            display: 'block',
        },
    },
    dividerStyled: {
        backgroundColor: '#fff',
        margin: '8px 0',
    },
};
