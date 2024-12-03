import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl,
    Card, CardContent, Alert
} from '@mui/material';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, marksObtained }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Error: Unable to update marks")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Marks updated successfully!")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        padding: 3,
                        backgroundColor: '#f4f6f9',
                    }}
                >
                    <Card
                        sx={{
                            maxWidth: 600,
                            width: '100%',
                            padding: 3,
                            boxShadow: 3,
                            borderRadius: 4,
                            backgroundColor: 'white',
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 2,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#3f51b5',
                                }}
                            >
                                Update Student Marks
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ textAlign: 'center', mb: 2 }}
                            >
                                Student Name: <strong>{userDetails.name}</strong>
                            </Typography>
                            {currentUser.teachSubject && (
                                <Typography
                                    variant="h6"
                                    sx={{ textAlign: 'center', mb: 3 }}
                                >
                                    Subject: <strong>{currentUser.teachSubject?.subName}</strong>
                                </Typography>
                            )}
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {situation === "Student" && (
                                        <FormControl fullWidth>
                                            <InputLabel>Select Subject</InputLabel>
                                            <Select
                                                value={subjectName}
                                                onChange={changeHandler}
                                                label="Choose Subject"
                                                required
                                            >
                                                {subjectsList ? (
                                                    subjectsList.map((subject, index) => (
                                                        <MenuItem key={index} value={subject.subName}>
                                                            {subject.subName}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem value="Select Subject" disabled>
                                                        No Subjects Available
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    )}
                                    <FormControl>
                                        <TextField
                                            type="number"
                                            label="Enter Marks"
                                            value={marksObtained}
                                            required
                                            onChange={(e) => setMarksObtained(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                        />
                                    </FormControl>
                                    {marksObtained && marksObtained < 0 && (
                                        <Alert severity="error">Marks cannot be negative!</Alert>
                                    )}
                                </Stack>
                                <BlueButton
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader || marksObtained < 0}
                                >
                                    {loader ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Submit Marks"
                                    )}
                                </BlueButton>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            )}

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
}

export default StudentExamMarks;
