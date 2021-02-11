import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import ModalUpload from "./ModalUpload";

const styles = {
  container: {
    position: "absolute",
    top: "20%",
    left: "28%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    alignItems: "center",
  },
};

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "user",
    };
  }

  handleType = (event, newType) => {
    this.setState({
      type: newType,
    });
    console.log(this.state.type);
  };
  render() {
    const { classes, visible } = this.props;

    if (visible === true)
      return (
        <Paper elevation={3} className={classes.container}>
          <ToggleButtonGroup
            value={this.state.type}
            exclusive
            onChange={this.handleType}
          >
            <ToggleButton value="user">
              <p>User</p>
            </ToggleButton>
            <ToggleButton value="boat">
              <p>Boat</p>
            </ToggleButton>
          </ToggleButtonGroup>
          <ModalUpload type={this.state.type} />
        </Paper>
      );

    return null;
  }
}

export default withStyles(styles)(Modal);
