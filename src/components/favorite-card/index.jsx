import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 175
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 18
  },
  mb10: {
    marginBottom: 10
  },
  mb30: {
    marginBottom: 30
  },
  mb60: {
    marginBottom: 60
  }
});

const FavoriteCard = ({cityName, value, weatherText}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.mb10}>
          {{cityName}}
        </div>
        <div className={classes.mb30}>
          {{value}}
        </div>
        <div className={classes.mb60}>
          {{weatherText}}
        </div>
      </CardContent>
    </Card>
  );
}

export default FavoriteCard;
