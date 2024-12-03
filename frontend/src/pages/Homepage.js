import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import styled from 'styled-components';
import ipulogo from "../assets/ipulogo.png";
import usar1 from "../assets/usar1.jpg";
import usar2 from "../assets/usar2.jpg";
import usar3 from "../assets/usar3.jpg";

const Homepage = () => {
  return (
    <StyledContainer>
      {/* Top Navigation */}
      <Header>
        <Link to="/">
          <Logo src={ipulogo} alt="Logo" />
        </Link>
        <Title>College Management System</Title>
      </Header>

      {/* Main Content */}
      <HeroSection>
        <Grid container spacing={4}>
          {/* Left Image */}
          <Grid item xs={12} md={6}>
            <ImageWrapper>
              <ImageSlider>
                <Image src={usar1} alt="Student 1" />
                <Image src={usar2} alt="Student 2" />
                <Image src={usar3} alt="Student 3" />
                <Image src={usar1} alt="Student 1" />
                <Image src={usar2} alt="Student 2" />
                <Image src={usar3} alt="Student 3" />
                <Image src={usar1} alt="Student 1" />
                <Image src={usar2} alt="Student 2" />
                <Image src={usar3} alt="Student 3" />
              </ImageSlider>
            </ImageWrapper>
          </Grid>

          {/* Right Content */}
          <Grid item xs={12} md={6}>
            <ContentWrapper>
              <MainTitle>Welcome to College</MainTitle>
              <Description>
                Manage your college seamlessly. Track attendance, organize classes, and evaluate performance—all in one place.
              </Description>
              <ButtonContainer>
                <StyledLink to="/choose">
                  <PrimaryButton>Login</PrimaryButton>
                </StyledLink>
                <StyledLink to="/chooseasguest">
                  <SecondaryButton>Login as Guest</SecondaryButton>
                </StyledLink>
              </ButtonContainer>
              <SignUpText>
                Don’t have an account?{' '}
                <StyledLink to="/Adminregister">
                  <SignUpLink>Sign up</SignUpLink>
                </StyledLink>
              </SignUpText>
            </ContentWrapper>
          </Grid>
        </Grid>
      </HeroSection>
    </StyledContainer>
  );
};

export default Homepage;

/* Styled Components */
const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #9b59b6, #4c2f91);
  color: #fff;
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 40px;
  background-color: rgba(0, 0, 0, 0.2); /* Added slight opacity for header */
  border-bottom: 2px solid #fff;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
  margin-right: 20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
`;

const HeroSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const ImageSlider = styled.div`
  display: flex;
  animation: slide 30s infinite linear; /* Slow sliding speed */
  gap: 15px; /* Added gap between images */
  
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(-200%);
    }
    75% {
      transform: translateX(-300%);
    }
    100% {
      transform: translateX(-400%);
    }
  }
`;

const Image = styled.img`
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 350px;
  &:hover {
    transform: scale(1.05);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
`;

const MainTitle = styled.h2`
  font-size: 3.2rem;
  margin-bottom: 25px;
  color: #fff;
  font-weight: 700;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
`;

const Description = styled.p`
  font-size: 1.3rem;
  margin-bottom: 40px;
  color: #e0e0e0;
  max-width: 550px;
  line-height: 1.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PrimaryButton = styled(Button)`
  && {
    background-color: #ff7f50;
    color: white;
    font-size: 1.3rem;
    padding: 16px 28px;
    border-radius: 50px;
    transition: transform 0.3s ease, background-color 0.3s ease;
    width: 100%;
    &:hover {
      background-color: #ff6333;
      transform: scale(1.05);
    }
  }
`;

const SecondaryButton = styled(Button)`
  && {
    border: 2px solid #ffffff;
    color: #ffffff;
    font-size: 1.3rem;
    padding: 16px 28px;
    border-radius: 50px;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;
    &:hover {
      background-color: #ffffff;
      color: #7f56da;
    }
  }
`;

const SignUpText = styled.p`
  margin-top: 20px;
  font-size: 1.1rem;
  color: #e0e0e0;
`;

const SignUpLink = styled.span`
  font-weight: bold;
  color: #ff7f50;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
















