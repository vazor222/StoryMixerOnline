import { styled, TextField, FormGroup, FormControl, Grid, alpha } from "@mui/material";

const StyledTextField = styled(TextField)(({theme})=>({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 4,
}))

const StyledFormGroup = styled(FormGroup)(({theme})=>({
marginBottom: theme.spacing(2)
}))

const StyledFormControl = styled(FormControl)(({theme})=>({
padding: theme.spacing(3),
minWidth: 275,
textAlign: 'left'
}))

const MainGridContainer = styled(Grid)(({theme}) => ({
  backgroundColor: alpha(theme.palette.primary.light, .125),
}))

const MainGridItem = styled(Grid)(({theme}) => ({
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  paddingBottom: theme.spacing(8),
  paddingTop: theme.spacing(5),
  justifyContent: 'center',
  display: 'flex',
}))

export {
  MainGridContainer,
  MainGridItem,
  StyledTextField,
  StyledFormGroup,
  StyledFormControl,
};