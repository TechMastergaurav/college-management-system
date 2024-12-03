import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Box,
  Checkbox,
  Typography,
  CircularProgress,
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = Array.isArray(complainsList) && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => (
    <Checkbox
      inputProps={{ 'aria-label': `Select complain ${row.id}` }}
      color="primary"
    />
  );

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress color="primary" size={40} />
        </Box>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
              <WarningAmberIcon color="warning" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h6" color="textSecondary">
                No Complains Right Now
              </Typography>
            </Box>
          ) : (
            <Paper
              sx={{
                width: '100%',
                overflow: 'hidden',
                boxShadow: 3,
                borderRadius: 2,
                mt: 2,
                p: 2,
              }}
            >
              {Array.isArray(complainsList) && complainsList.length > 0 && (
                <TableTemplate
                  buttonHaver={ComplainButtonHaver}
                  columns={complainColumns}
                  rows={complainRows}
                />
              )}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default SeeComplains;
