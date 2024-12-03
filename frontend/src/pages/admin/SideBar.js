import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styled from 'styled-components';

const SideBar = () => {
    const location = useLocation();

    return (
        <SidebarContainer>
            <React.Fragment>
                <ListItemButtonStyled component={Link} to="/">
                    <ListItemIconStyled>
                        <HomeIconStyled color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Home" />
                </ListItemButtonStyled>
                <ListItemButtonStyled component={Link} to="/Admin/classes">
                    <ListItemIconStyled>
                        <ClassOutlinedIconStyled color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Classes" />
                </ListItemButtonStyled>
                <ListItemButtonStyled component={Link} to="/Admin/subjects">
                    <ListItemIconStyled>
                        <AssignmentIconStyled color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Subjects" />
                </ListItemButtonStyled>
                <ListItemButtonStyled component={Link} to="/Admin/teachers">
                    <ListItemIconStyled>
                        <SupervisorAccountOutlinedIconStyled color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Teachers" />
                </ListItemButtonStyled>
                <ListItemButtonStyled component={Link} to="/Admin/students">
                    <ListItemIconStyled>
                        <PersonOutlineIconStyled color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Students" />
                </ListItemButtonStyled>
                <ListItemButtonStyled component={Link} to="/Admin/notices">
                    <ListItemIconStyled>
                        <AnnouncementOutlinedIconStyled color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Notices" />
                </ListItemButtonStyled>
                <ListItemButtonStyled component={Link} to="/Admin/complains">
                    <ListItemIconStyled>
                        <ReportIconStyled color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Complains" />
                </ListItemButtonStyled>
            </React.Fragment>
            <DividerStyled sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheaderStyled component="div" inset>
                    User
                </ListSubheaderStyled>
                <ListItemButtonStyled component={Link} to="/Admin/profile">
                    <ListItemIconStyled>
                        <AccountCircleOutlinedIconStyled color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Profile" />
                </ListItemButtonStyled>
                <ListItemButtonStyled component={Link} to="/logout">
                    <ListItemIconStyled>
                        <ExitToAppIconStyled color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIconStyled>
                    <ListItemTextStyled primary="Logout" />
                </ListItemButtonStyled>
            </React.Fragment>
        </SidebarContainer>
    );
};

export default SideBar;

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ListItemButtonStyled = styled(ListItemButton)`
  padding: 12px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ListItemIconStyled = styled(ListItemIcon)`
  min-width: 36px;
`;

const ListItemTextStyled = styled(ListItemText)`
  font-weight: 500;
`;

const ListSubheaderStyled = styled(ListSubheader)`
  font-weight: 600;
  color: #7f56da;
`;

const DividerStyled = styled(Divider)`
  margin: 8px 0;
`;

const HomeIconStyled = styled(HomeIcon)`
  transition: all 0.3s ease;
`;

const ClassOutlinedIconStyled = styled(ClassOutlinedIcon)`
  transition: all 0.3s ease;
`;

const AssignmentIconStyled = styled(AssignmentIcon)`
  transition: all 0.3s ease;
`;

const SupervisorAccountOutlinedIconStyled = styled(SupervisorAccountOutlinedIcon)`
  transition: all 0.3s ease;
`;

const PersonOutlineIconStyled = styled(PersonOutlineIcon)`
  transition: all 0.3s ease;
`;

const AnnouncementOutlinedIconStyled = styled(AnnouncementOutlinedIcon)`
  transition: all 0.3s ease;
`;

const ReportIconStyled = styled(ReportIcon)`
  transition: all 0.3s ease;
`;

const AccountCircleOutlinedIconStyled = styled(AccountCircleOutlinedIcon)`
  transition: all 0.3s ease;
`;

const ExitToAppIconStyled = styled(ExitToAppIcon)`
  transition: all 0.3s ease;
`;


