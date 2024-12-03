import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Students Card */}
                <Grid item xs={12} md={4} lg={3}>
                    <StyledPaper>
                        <CardImage src={Students} alt="Students" />
                        <CardTitle>Total Students</CardTitle>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Classes Card */}
                <Grid item xs={12} md={4} lg={3}>
                    <StyledPaper>
                        <CardImage src={Classes} alt="Classes" />
                        <CardTitle>Total Classes</CardTitle>
                        <Data start={0} end={numberOfClasses} duration={5} />
                    </StyledPaper>
                </Grid>

                {/* Teachers Card */}
                <Grid item xs={12} md={4} lg={3}>
                    <StyledPaper>
                        <CardImage src={Teachers} alt="Teachers" />
                        <CardTitle>Total Teachers</CardTitle>
                        <Data start={0} end={numberOfTeachers} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Fees Card - Uncomment if needed */}
                {/* <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <CardImage src={Fees} alt="Fees" />
                        <CardTitle>Fees Collection</CardTitle>
                        <Data start={0} end={23000} duration={2.5} prefix="$" />
                    </StyledPaper>
                </Grid> */}

                {/* Notices Section */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  object-fit: contain;
`;

const CardTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const Data = styled(CountUp)`
  font-size: 2rem;
  font-weight: 700;
  color: #4caf50; /* Green color */
`;

export default AdminHomePage;
