import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import {
    Box, Container, Typography, Tab, IconButton, Paper, Grid, Button
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material/styles'; // Hook to access theme

const ClassDetails = () => {
    const theme = useTheme(); // Accessing the theme object
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        // Implement your delete logic here
    };

    const ClassSubjectsSection = () => {
        return (
            <>
                {response ? (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <Button
                            variant="contained"
                            color="primary" // Applying primary color
                            onClick={() => navigate(`/Admin/addsubject/${classID}`)}
                            sx={{
                                borderRadius: 12, // Softer roundness
                                padding: '6px 16px', // Smaller padding for smaller size
                                boxShadow: 1,
                                transition: 'transform 0.3s',
                                "&:hover": {
                                    transform: 'scale(1.05)',
                                },
                                margin: '0 10px',
                            }}
                        >
                            Add Subjects
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Subjects List:
                        </Typography>
                        <Paper sx={{ padding: '20px', boxShadow: 5, borderRadius: 2 }}>
                            {/* Table Template will be here */}
                        </Paper>
                    </>
                )}
            </>
        );
    };

    const ClassStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <Button
                            variant="contained"
                            color="secondary" // Applying secondary color
                            onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}
                            sx={{
                                borderRadius: 12, // Softer roundness
                                padding: '6px 16px', // Smaller padding for smaller size
                                boxShadow: 1,
                                transition: 'transform 0.3s',
                                "&:hover": {
                                    transform: 'scale(1.05)',
                                },
                                margin: '0 10px',
                            }}
                        >
                            Add Students
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Students List:
                        </Typography>
                        <Paper sx={{ padding: '20px', boxShadow: 5, borderRadius: 2 }}>
                            {/* Table Template will be here */}
                        </Paper>
                    </>
                )}
            </>
        );
    };

    const ClassDetailsSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    This is Class {sclassDetails && sclassDetails.sclassName}
                </Typography>
                <Grid container spacing={3} sx={{ marginTop: 3 }}>
                    {getresponse && (
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}
                                sx={{
                                    borderRadius: 12, // Softer roundness
                                    padding: '6px 16px', // Smaller padding for smaller size
                                    boxShadow: 1,
                                    transition: 'transform 0.3s',
                                    "&:hover": {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                Add Students
                            </Button>
                        </Grid>
                    )}
                    {response && (
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={() => navigate(`/Admin/addsubject/${classID}`)}
                                sx={{
                                    borderRadius: 12, // Softer roundness
                                    padding: '6px 16px', // Smaller padding for smaller size
                                    boxShadow: 1,
                                    transition: 'transform 0.3s',
                                    "&:hover": {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                Add Subjects
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    <Tab label="Subjects" value="2" />
                                    <Tab label="Students" value="3" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "5rem", marginBottom: "5rem" }}>
                                <TabPanel value="1">
                                    <ClassDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <ClassSubjectsSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <ClassStudentsSection />
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            )}
        </>
    );
};

export default ClassDetails;




