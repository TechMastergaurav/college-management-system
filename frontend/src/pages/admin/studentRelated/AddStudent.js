import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box, Typography } from '@mui/material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = 'Student';
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <form onSubmit={submitHandler} style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: '#fff', boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h4" align="center" sx={{ marginBottom: '1rem' }}>Add Student</Typography>

                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{ marginBottom: '1rem' }}
                    />

                    {situation === "Student" && (
                        <FormControl fullWidth sx={{ marginBottom: '1rem' }} required>
                            <InputLabel>Select Class</InputLabel>
                            <Select
                                value={className}
                                onChange={changeHandler}
                                label="Select Class"
                                required
                            >
                                <MenuItem value='Select Class'>Select Class</MenuItem>
                                {sclassesList.map((classItem, index) => (
                                    <MenuItem key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <TextField
                        label="Roll Number"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={rollNum}
                        onChange={(e) => setRollNum(e.target.value)}
                        required
                        sx={{ marginBottom: '1rem' }}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ marginBottom: '1rem' }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={loader}
                        sx={{
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            boxShadow: 1,
                            transition: 'transform 0.2s ease-in-out',
                            "&:hover": {
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
                    </Button>
                </form>
            </Box>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddStudent;
