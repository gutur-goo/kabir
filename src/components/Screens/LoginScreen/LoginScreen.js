import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SatSahib from '../../../assets/images/satSahib.jpeg';
import Logo from '../../../assets/images/logo2.png';
import { sha256 } from 'js-sha256';

const theme = createTheme();

export default function SignIn(props) {

  const {hashedPassAdmin,hashedPassNormal,isMobile = false} = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const hashedValue = sha256(data.get('email')+'_'+data.get('password')+new Date().getDate() + new Date().getMonth());
    if(hashedValue === hashedPassAdmin)
    {
        window.sessionStorage.login_token = hashedValue;
        window.open(window.location.href,`_self`);
    }
    else
    if(hashedValue === hashedPassNormal)
    {
        window.sessionStorage.login_token = hashedValue;
        window.open(window.location.href,`_self`);
    }
    else
    {
        alert('Wrong Login Credentials')
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: isMobile ? 2 : 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            {!isMobile && <div style={{position:'absolute',left:'25%',top:'40%'}}>
            <img src={SatSahib} width={"40%"} />
          <Typography component="h1" variant="h5" style={{marginLeft:'12%'}}>
            Sat Sahib
          </Typography>
            </div>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{marginTop: isMobile ? null : '10%'}}>
          <img src={isMobile ? SatSahib : Logo} width={isMobile ? '50%' : '70%'} />
          <h1>Welcome to Kabir Transport LLC</h1>   
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="UserName"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}