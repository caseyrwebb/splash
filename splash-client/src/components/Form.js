import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = {
  form: {
    height: "73.8vh",
    overflow: "auto",
  },
  name: {
    margin: "10px auto 40px auto",
  },
  select: {
    margin: "10px auto 40px auto",
    width: "100%",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    marginTop: "35px",
    marginBottom: "0px",
  },
};

class Form extends Component {
  render() {
    const {
      classes,
      users,
      slips,
      handleSubmit,
      workerTextFieldValue,
      boatTextFieldValue,
      onNameChange,
      workerOpen,
      handleWorkerClose,
      handleWorkerOpen,
      worker,
      children,
      handleWorkerChange,
      boatOpen,
      handleBoatClose,
      handleBoatOpen,
      boat,
      handleBoatChange,
    } = this.props;

    return (
      <form noValidate onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.nameBox}>
          <Typography variant="h5">Worker Name</Typography>
          <Select
            id="worker"
            open={workerOpen}
            onClose={handleWorkerClose}
            onOpen={handleWorkerOpen}
            value={worker}
            onChange={handleWorkerChange}
            variant="outlined"
            className={classes.select}
          >
            //Pass id to retrieve entry in user page
            {this.props.users.map((user) => (
              <MenuItem value={user.userName}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={classes.nameBox}>
          <Typography variant="h5">Boat Name</Typography>
          <Select
            id="boat"
            open={boatOpen}
            onClose={handleBoatClose}
            onOpen={handleBoatOpen}
            value={boat}
            onChange={handleBoatChange}
            variant="outlined"
            className={classes.select}
          >
            //Try componentDidPassProps
            {this.props.slips.map((slip) => {
              if (slip.occupied === true)
                return (
                  <MenuItem value={slip.boatName}>{slip.boatName}</MenuItem>
                );
              return null;
            })}
          </Select>
        </div>
        <div className={classes.materials}>{children}</div>
        <div className={classes.buttonBox}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(Form);
