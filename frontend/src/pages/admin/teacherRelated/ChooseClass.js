import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Paper, Container } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID);
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID);
        }
    }

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    });

    const SclassButtonHaver = ({ row }) => {
        return (
            <PurpleButton variant="contained" onClick={() => navigateHandler(row.id)}>
                Choose
            </PurpleButton>
        );
    };

    return (
        <>
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
                    <Typography variant="h5">Loading...</Typography>
                </Box>
                :
                <Container sx={{ maxWidth: 'lg', marginTop: 4 }}>
                    {getresponse ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#3f51b5' }} onClick={() => navigate("/Admin/addclass")}>
                                Add Class
                            </Button>
                        </Box>
                        :
                        <>
                            <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', boxShadow: 2 }}>
                                <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                    Choose a Class
                                </Typography>
                                {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                                    <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                                }
                            </Paper>
                        </>
                    }
                </Container>
            }
        </>
    );
};

export default ChooseClass;
