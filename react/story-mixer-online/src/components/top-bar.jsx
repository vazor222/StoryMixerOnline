import React from "react";
import { AppBar, Box, Typography, useTheme, alpha } from "@mui/material";

export default function TopBar() {
  const theme = useTheme();
  return (
    <AppBar position='static'
				sx={{ 
					backgroundColor: theme.palette.primary.light,
					bottomBorder: `3px solid ${theme.palette.secondary.light}`
				}}
			>
				<Box padding={2} borderLeft={'10px solid ' + theme.palette.secondary.main}>
					<Typography variant='h5'>Welcome to Story Mixer Online! </Typography>
					<Typography variant='subtitle1' color={alpha(theme.palette.common.white, 0.75)}>A cooperative storytelling game for people who like to come up with ideas and combine them with others.</Typography>
				</Box>
			</AppBar>
  )
}