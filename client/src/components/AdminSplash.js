import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  const [fChecked, setFChecked] = useState(false);
  const [aChecked, setAChecked] = useState(false);
  const [pChecked, setPChecked] = useState(false);

  const handleFChange = (event) => {
    setFChecked(event.target.checked);
  };
  const handleAChange = (event) => {
    setAChecked(event.target.checked);
  };

  const handlePChange = (event) => {
    setPChecked(event.target.checked);
  };

  return (
    <div>
      <h1>Features to Add To Patient Check-In</h1>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            Add Family Name to Check-in
          </Typography>
        </CardContent>
        <CardActions>
          <Checkbox
            checked={fChecked}
            onChange={handleFChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            Add Address to Check-In
          </Typography>
        </CardContent>
        <CardActions>
          <Checkbox
            checked={aChecked}
            onChange={handleAChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            Phone Number Into Check-In
          </Typography>
        </CardContent>
        <CardActions>
          <Checkbox
            checked={pChecked}
            onChange={handlePChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </CardActions>
      </Card>
    </div>
  );
}
