import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import iconePokebola from '../../src/images/pokebola.png';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    navigate('/pokedex');
  };

  const handleCharactersClick = () => {
    navigate('/');
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    { name: 'Characters', page: handleCharactersClick },
    { name: 'Favorites', page: handleFavoritesClick }
  ];

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="static" style={{ backgroundColor: '#5F8C88' }}>
        <Toolbar>
          <img style={{ height: '50px', width: '50px', cursor: 'pointer' }} src={iconePokebola} alt="pokebola" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block', marginLeft: '1%', cursor: 'pointer', width: '15%' }
            }}
          >
            POKEDEX
          </Typography>

          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex', justifyContent: 'flex-end', width: '100%', gap: 15 }
            }}
          >
            <Button
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
              onClick={handleCharactersClick}
              startIcon={<CatchingPokemonIcon />}
            >
              Characters
            </Button>
            <Button
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
              onClick={handleFavoritesClick}
              startIcon={<CatchingPokemonIcon />}
            >
              Favorites
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={page.page}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
