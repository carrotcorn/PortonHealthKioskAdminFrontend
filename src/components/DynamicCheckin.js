import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {
  getAllCheckInFields,
  getUserCheckInFields,
  setUserCheckInFields,
} from "../utilities/API";
import { CircularProgress, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px 50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  checkboxes: {
    marginBottom: "20px",
  },
}));

export default function CheckInFormFields(props) {
  const classes = useStyles();
  const [state, setState] = React.useState();
  const [error, setError] = React.useState(false);

  useEffect(() => {
    // TODO: consider moving this logic to the api/backend
    const fields = getAllCheckInFields() || [];
    const userFields = getUserCheckInFields() || [];

    let configuredInputTypes = new Set();
    for (let userField of userFields) {
      configuredInputTypes.add(userField.inputType);
    }

    setState(
      fields.map((field) => ({
        ...field,
        active: configuredInputTypes.has(field.inputType),
      }))
    );
  }, []);

  const handleChange = (event) => {
    setState(
      state.map((field) =>
        field.name === event.target.name
          ? { ...field, active: !field.active }
          : field
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const checked = state.filter((field) => field.active);

    if (checked.length < 1) {
      setError(true);
      return;
    }

    setUserCheckInFields(
      checked.map(({ inputType, name }) => ({ inputType, name }))
    );

    props.onSubmitted();
  };

  return state ? (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl
          required
          error={error}
          component='fieldset'
          className={classes.checkboxes}
        >
          <FormGroup>
            {state.map(({ inputType, name, label, active }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={active}
                    onChange={handleChange}
                    name={name}
                  />
                }
                label={label}
                key={inputType}
              />
            ))}
          </FormGroup>
          {error && <FormHelperText>Select at least one.</FormHelperText>}
        </FormControl>
        <Button type='submit' variant='contained' color='primary'>
          Save Preferences
        </Button>
      </form>
    </Paper>
  ) : (
    <CircularProgress />
  );
}
