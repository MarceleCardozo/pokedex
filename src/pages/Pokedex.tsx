import { Grid } from '@mui/material';
import NavBar from '../components/navbar';

const Pokedex: React.FC = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
      </Grid>
    </>
  );
};

export default Pokedex;
