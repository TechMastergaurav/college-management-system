import { useState } from 'react'; // Add this import
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Collapse, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showTab, setShowTab] = useState(false); // This will now work
    const buttonText = showTab ? 'Cancel' : 'Edit Profile';

    return (
        <ProfileContainer>
            <ProfileCard>
                <ProfileTitle>Admin Profile</ProfileTitle>
                <ProfileDetails>
                    <DetailRow>
                        <strong>Name:</strong> {currentUser.name}
                    </DetailRow>
                    <DetailRow>
                        <strong>Email:</strong> {currentUser.email}
                    </DetailRow>
                    <DetailRow>
                        <strong>School:</strong> {currentUser.schoolName}
                    </DetailRow>
                </ProfileDetails>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ width: '100%', marginTop: '20px' }}
                    onClick={() => setShowTab(!showTab)}
                >
                    {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />} {buttonText}
                </Button>
            </ProfileCard>

            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <EditFormContainer>
                    <ProfileTitle>Edit Details</ProfileTitle>
                    <EditForm>
                        <label>Name</label>
                        <input className="registerInput" type="text" placeholder="Enter your name..." required />

                        <label>School</label>
                        <input className="registerInput" type="text" placeholder="Enter your school name..." required />

                        <label>Email</label>
                        <input className="registerInput" type="email" placeholder="Enter your email..." required />

                        <label>Password</label>
                        <input className="registerInput" type="password" placeholder="Enter your password..." />

                        <UpdateButton>Update</UpdateButton>
                    </EditForm>
                </EditFormContainer>
            </Collapse>
        </ProfileContainer>
    );
};

// Styled components
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 20px;
`;

const ProfileCard = styled(Paper)`
    padding: 20px;
    width: 100%;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    border-radius: 10px;
`;

const ProfileTitle = styled.h2`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
    margin-bottom: 20px;
`;

const DetailRow = styled.div`
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 10px;
    text-align: left;
`;

const EditFormContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;

    label {
        font-size: 1rem;
        color: #333;
    }

    .registerInput {
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
        width: 100%;
    }
`;

const UpdateButton = styled(Button)`
    background-color: #4caf50;
    color: white;
    padding: 10px;
    font-size: 1.1rem;
    border-radius: 5px;

    &:hover {
        background-color: #45a049;
    }
`;

export default AdminProfile;

