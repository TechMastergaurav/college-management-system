import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, TextField, Button, Box, Typography, Paper } from '@mui/material';

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id;

  const fields = { name, email, password, role, school, teachSubject, teachSclass };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate("/Admin/teachers");
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
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <Paper sx={{ padding: '2rem', maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: '1.5rem' }}>
          Add Teacher
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
          Subject: {subjectDetails && subjectDetails.subName}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '1.5rem' }}>
          Class: {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ marginBottom: '1.5rem' }}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ marginBottom: '1.5rem' }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: '1.5rem' }}
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
            {loader ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
      </Paper>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddTeacher;
