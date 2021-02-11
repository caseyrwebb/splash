import React, { useState, useEffect } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const useStyles = makeStyles({
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "550px",
  },
});

function ModalUpload({ type }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [boatName, setBoatName] = useState("");
  const [boatMake, setBoatMake] = useState("");
  const [boatLength, setBoatLength] = useState("");
  const [boatYear, setBoatYear] = useState("");
  const [slipNumber, setSlipNumber] = useState("");

  const classes = useStyles();

  const handleUserSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post("/signup", newUserData)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  const handleBoatSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newBoatData = {
      boatName: boatName,
      boatMake: boatMake,
      boatLength: boatLength,
      boatYear: boatYear,
      slipNumber: slipNumber,
    };
    axios
      .post("/createBoat", newBoatData)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  if (type === "user")
    return (
      <div>
        <form noValidate onSubmit={handleUserSubmit} className={classes.form}>
          <TextField
            id="firstName"
            name="firstName"
            type="text"
            label="first name"
            helperText={errors.firstName}
            error={errors.firstName ? true : false}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="lastName"
            name="lastName"
            type="text"
            label="last name"
            helperText={errors.lastName}
            error={errors.lastName ? true : false}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="userName"
            name="userName"
            type="text"
            label="user name"
            helperText={errors.userName}
            error={errors.userName ? true : false}
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="email"
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="confirm password"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            fullWidth
            className={classes.textField}
          />
          {errors.general && (
            <Typography variant="body2">
              {errors.general} className={classes.customError}>
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.button}
          >
            Submit
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
      </div>
    );

  return (
    <div>
      <div style={{ marginTop: "2em", marginBottom: "1em" }}>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
      </div>
      <form noValidate onSubmit={handleBoatSubmit} className={classes.form}>
        <TextField
          id="boatName"
          name="boatName"
          type="text"
          label="boat name"
          value={boatName}
          onChange={(event) => setBoatName(event.target.value)}
          fullWidth
          className={classes.textField}
        />
        <TextField
          id="boatMake"
          name="boatName"
          type="text"
          label="boat make"
          value={boatMake}
          onChange={(event) => setBoatMake(event.target.value)}
          fullWidth
          className={classes.textField}
        />
        <TextField
          id="boatLength"
          name="boatLength"
          type="text"
          label="boat length"
          value={boatLength}
          onChange={(event) => setBoatLength(event.target.value)}
          fullWidth
          className={classes.textField}
        />
        <TextField
          id="boatYear"
          name="boatYear"
          type="text"
          label="boat year"
          value={boatYear}
          onChange={(event) => setBoatYear(event.target.value)}
          fullWidth
          className={classes.textField}
        />
        <TextField
          id="slipNumber"
          name="slipNumber"
          type="text"
          label="slip number"
          value={slipNumber}
          onChange={(event) => setSlipNumber(event.target.value)}
          fullWidth
          className={classes.textField}
        />
        {errors.general && (
          <Typography variant="body2">
            {errors.general} className={classes.customError}>
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className={classes.button}
        >
          Submit
          {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </Button>
      </form>
    </div>
  );
}

export default ModalUpload;
