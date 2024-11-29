import { paths } from '@/paths';
import { BackupTable } from '@mui/icons-material';
import { Button, CardActions, Grid2 as Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ActionAreaCard() {
  return (
    <Stack sx={{ height: '100vh' }} justifyContent="center">
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea href={paths.zuordnungstabelle}>
              <CardMedia>
                <BackupTable />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Zuordungstabellen
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Tabellarische Auflistung aller Lehrveranstaltungen und deren Zugehörigkeit zu den Studienbereichen.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" size="small" color="primary">
                Bachelor
              </Button>
              <Button variant="contained" size="small" color="primary">
                Master
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea href={paths.veranstaltungsverzeichnis}>
              <BackupTable />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Veranstaltungsverzeichnisse
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Eine detaillierte Auflistung aller Modulbeschreibungen mit Inhalten und Qualifikationszielen.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" size="small" color="primary">
                Bachelor
              </Button>
              <Button variant="contained" size="small" color="primary">
                Master
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}


