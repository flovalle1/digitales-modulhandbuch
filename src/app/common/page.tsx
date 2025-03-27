import { paths } from '@/paths';
import { Button, CardActions, Grid2 as Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Stack sx={{ height: '100vh' }} justifyContent="center">
      <Typography sx={{ mb: 6 }} variant="h4" align="center" gutterBottom color='black'>
        Willkommen beim digitalen Modulverzeichnis des Fachbereichs Informatik!
      </Typography>
      <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
        <Grid>
          <Card sx={{ maxWidth: 545 }}>
            <CardActionArea href={paths.zuordnungstabelle}>
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
              <Button href={paths.veranstaltungsverzeichnisFilter("cs")} variant="contained" size="small" color="primary">
                Bachelor
              </Button>
              <Button href={paths.veranstaltungsverzeichnisFilter("cs-master")} variant="contained" size="small" color="primary">
                Master
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid>
          <Card sx={{ maxWidth: 545 }}>
            <CardActionArea href={paths.veranstaltungsverzeichnis}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Veranstaltungsverzeichniss
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Eine detaillierte Auflistung aller Modulbeschreibungen mit Inhalten und Qualifikationszielen.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button href={paths.veranstaltungsverzeichnis} variant="contained" size="small" color="primary">
                Öffnen
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}


