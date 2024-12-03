import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box, CircularProgress, Alert } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }} gutterBottom>
                        Teacher Details
                    </Typography>
                    
                    <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 2, backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                            Teacher Name: <span style={{ color: 'primary.main' }}>{teacherDetails?.name}</span>
                        </Typography>
                        
                        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                            Class Name: <span style={{ color: 'primary.main' }}>{teacherDetails?.teachSclass?.sclassName}</span>
                        </Typography>
                        
                        {isSubjectNamePresent ? (
                            <>
                                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                                    Subject Name: <span style={{ color: 'primary.main' }}>{teacherDetails?.teachSubject?.subName}</span>
                                </Typography>
                                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                                    Subject Sessions: <span style={{ color: 'primary.main' }}>{teacherDetails?.teachSubject?.sessions}</span>
                                </Typography>
                            </>
                        ) : (
                            <Box sx={{ marginTop: 3 }}>
                                <Button variant="contained" color="primary" onClick={handleAddSubject}>
                                    Add Subject
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Container>
            )}
            {error && (
                <Box sx={{ width: '100%', marginTop: 3 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}
        </>
    );
};

export default TeacherDetails;
