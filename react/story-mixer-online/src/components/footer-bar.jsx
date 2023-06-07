import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import InfoIcon from '@mui/icons-material/HelpRounded';

export default function FooterBar() {
  const theme = useTheme();
  return(
    <Box padding={2} sx={{
      display: 'flex',
      columnGap: 3,
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.background.default
    }}>
      <Typography variant='caption' color={theme.palette.info.main}>
        By using this website you agree that we are not liable for your use of our game,
        any content you submit is fair use, and you will not disrupt or harass other players.
      </Typography>
      <Button variant='outlined' to="/info" startIcon={<InfoIcon color='secondary' />}>
          Info
      </Button>
    </Box>
  )
}