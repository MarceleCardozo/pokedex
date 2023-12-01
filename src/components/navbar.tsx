import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import iconePokebola from '../../src/images/pokebola.png';

export default function NavBar() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/pokedex');
  };

  const handleTypographyClick = () => {
    navigate('/pokedex');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#5F8C88' }}>
        <Toolbar>
          <img
            style={{ height: '50px', width: '50px', cursor: 'pointer' }}
            src={iconePokebola}
            alt="pokebola"
            onClick={handleImageClick}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', marginLeft: '1%', cursor: 'pointer' } }}
            onClick={handleTypographyClick}
          >
            POKEDEX
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
