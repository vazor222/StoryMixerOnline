import React, { useState } from "react";
import { Grid, Button, FormControl, Typography, FormGroup, TextField, useTheme, Link } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function ChattySignup() {
  const theme = useTheme();
  const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
  return(
    <Grid container>
      <Grid item
        xs={12}
        padding={2}
        sx={{ 
          backgroundColor: theme.palette.primary.light,
          color: 'common.white',
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        <FormControl sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', maxWidth: theme.breakpoints.values.sm, }}>
          <Typography variant='h5'>
            Sign Up to <Link to="/">Chatty</Link>
          </Typography>
          <FormGroup sx={{ justifyContent: 'center' }}>
            <TextField
              size='small'
              placeholder="Email"
              name="email"
              type="email"
              onChange={(e) => {setEmail(e.target.value)}}
              value={email}
              sx={{ m:1 }}
            />
            <TextField
              size='small'
              placeholder="Password"
              name="password"
              onChange={(e) => {setPassword(e.target.value)}}
              value={password}
              type="password"
              sx={{ m:1 }}
            />
            <Button type="submit" endIcon={<SendIcon />}>Sign up</Button>
          </FormGroup>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </FormControl>
      </Grid>
    </Grid>
  )
}