import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
  Link
} from 'react-router-dom';
import TriageFolder from "../TriageTool/TriageHeader/TriageHeader";
import StartUpTool from "../StartUp/Pages/index"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

     <Router> 
      <Grid item xs={6}>
        
        <Card className={classes.root}>

      <CardActionArea>
        <Link to='/TriageFolder' underline="none">
        <CardMedia
          className={classes.media}
          src="../"
          title="Triage Folder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Triage Folder
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Create project folder, estimate the design time and add triage notes. 
          </Typography>
        </CardContent>
        
        </Link>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>


    </Grid>

        <Grid item xs={6}>
              <Card className={classes.root}>
                <CardActionArea>
                  <Link to="/StartUpTool" underline="none">
                    <CardMedia
                     className={classes.media}
                     image="/static/images/cards/contemplative-reptile.jpg"
                      title="StartUp Tool"
                     />
                <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            StartUp Tool
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Calculate the StartUp for your projects. 
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    
        </Grid>

  <Switch>
    <Route path="/TriageFolder"> 
      <TriageFolder/>
    </Route>
     <Route path="/StartUpTool"> 
      <StartUpTool/>
    </Route>
  </Switch>
        
</Router>
      </Grid>
    </div>
  );
}
