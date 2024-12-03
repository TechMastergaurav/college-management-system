import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';
import {
  ButtonGroup,
  Button,
  MenuItem,
  MenuList,
  Popper,
  ClickAwayListener,
  Grow,
} from '@mui/material';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { studentsList, loading, error, response } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function is currently disabled.");
    setShowPopup(true);
  };

  const studentColumns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    { id: 'sclassName', label: 'Class', minWidth: 170 },
  ];

  const studentRows = Array.isArray(studentsList) && studentsList.length > 0
    ? studentsList.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        sclassName: student.sclassName.sclassName,
        id: student._id,
      }))
    : [];

  const StudentButtonHaver = ({ row }) => {
    const options = ['Take Attendance', 'Provide Marks'];
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = () => {
      if (selectedIndex === 0) navigate(`/Admin/students/student/attendance/${row.id}`);
      else if (selectedIndex === 1) navigate(`/Admin/students/student/marks/${row.id}`);
    };

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) return;
      setOpen(false);
    };

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Student")} title="Remove Student">
          <PersonRemoveIcon color="error" />
        </IconButton>
        <BlueButton variant="contained" onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
          View
        </BlueButton>
        <ButtonGroup variant="contained" ref={anchorRef}>
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <BlackButton
            size="small"
            onClick={handleToggle}
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </BlackButton>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
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
      </>
    );
  };

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: 'Add New Student',
      action: () => navigate("/Admin/addstudents"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: 'Delete All Students',
      action: () => deleteHandler(currentUser._id, "Students"),
    },
  ];

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No students found.
              </Typography>
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden', p: 2, boxShadow: 3, borderRadius: 2 }}>
              {studentRows.length > 0 && (
                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
              )}
              <SpeedDialTemplate actions={actions} />
            </Paper>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowStudents;
