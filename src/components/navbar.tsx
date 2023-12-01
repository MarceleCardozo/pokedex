import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import iconePokebola from '../../src/images/pokebola.png';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#5F8C88' }}>
        <Toolbar>
          <img style={{ height: '50px', width: '50px' }} src={iconePokebola} alt="pokebola" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', marginLeft: '1%' } }}
          >
            POKEDEX
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
