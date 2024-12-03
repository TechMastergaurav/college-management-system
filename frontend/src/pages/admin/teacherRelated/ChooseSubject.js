import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            dispatch(getTeacherFreeClassSubjects(params.id));
        } else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation, params, dispatch]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
                <CircularProgress />
            </Box>
        );
    } else if (response) {
        return (
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    Sorry, all subjects have teachers assigned already.
                </Typography>
                <PurpleButton variant="contained" onClick={() => navigate("/Admin/addsubject/" + classID)}>
                    Add Subjects
                </PurpleButton>
            </Box>
        );
    } else if (error) {
        console.log(error);
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject));
        navigate("/Admin/teachers");
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 3, padding: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom component="div" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
                Choose a Subject
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table aria-label="subjects table">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Subject Name</StyledTableCell>
                            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Subject Code</StyledTableCell>
                            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                            subjectsList.map((subject, index) => (
                                <StyledTableRow key={subject._id} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                                    <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{subject.subName}</StyledTableCell>
                                    <StyledTableCell align="center">{subject.subCode}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {situation === "Norm" ? (
                                            <GreenButton variant="contained"
                                                sx={{ margin: 1 }}
                                                onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}>
                                                Choose
                                            </GreenButton>
                                        ) : (
                                            <GreenButton variant="contained" disabled={loader}
                                                sx={{ margin: 1 }}
                                                onClick={() => updateSubjectHandler(teacherID, subject._id)}>
                                                {loader ? (
                                                    <CircularProgress size={24} sx={{ color: 'white' }} />
                                                ) : (
                                                    'Choose Subject'
                                                )}
                                            </GreenButton>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ChooseSubject;
