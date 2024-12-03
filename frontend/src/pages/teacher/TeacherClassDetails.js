import { useEffect } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { Paper, Box, Typography, ButtonGroup, Button, Popper, Grow, ClickAwayListener, MenuList, MenuItem, CircularProgress } from '@mui/material';
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
        };
        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <>
                <BlueButton
                    variant="contained"
                    sx={styles.viewButton}
                    onClick={() => navigate(`/Teacher/class/student/${row.id}`)}
                >
                    View
                </BlueButton>
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick} sx={styles.actionButton}>
                            {options[selectedIndex]}
                        </Button>
                        <BlackButton
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                            sx={styles.toggleButton}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlackButton>
                    </ButtonGroup>
                    <Popper
                        sx={{ zIndex: 1 }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
            </>
        );
    };

    return (
        <>
            {loading ? (
                <Box sx={styles.loadingBox}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom sx={styles.title}>
                        Class Details
                    </Typography>
                    {getresponse ? (
                        <Box sx={styles.noStudentsText}>
                            <Typography variant="h6">No Students Found</Typography>
                        </Box>
                    ) : (
                        <Paper sx={styles.paper}>
                            <Typography variant="h5" gutterBottom>
                                Students List:
                            </Typography>

                            {Array.isArray(sclassStudents) && sclassStudents.length > 0 ? (
                                <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                            ) : (
                                <Box sx={styles.noStudentsText}>
                                    <Typography variant="h6">No students in this class.</Typography>
                                </Box>
                            )}
                        </Paper>
                    )}
                </>
            )}
        </>
    );
};

// Styles for a more attractive UI
const styles = {
    title: {
        fontWeight: 'bold',
        color: '#3f51b5',
    },
    paper: {
        width: '100%',
        padding: '16px',
        boxShadow: 3,
        borderRadius: '8px',
        marginTop: '20px',
        backgroundColor: '#fafafa',
    },
    loadingBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    },
    viewButton: {
        backgroundColor: '#1976d2',
        '&:hover': {
            backgroundColor: '#1565c0',
        },
        padding: '8px 16px',
        marginRight: '8px',
        fontSize: '14px',
    },
    actionButton: {
        fontSize: '14px',
        padding: '8px 16px',
    },
    toggleButton: {
        padding: '8px',
    },
    noStudentsText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        color: '#d32f2f',
        fontWeight: 'bold',
    },
};

export default TeacherClassDetails;
