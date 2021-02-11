import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import AddBoatCard from "./AddBoatCard";

const styles = {
  container: {
    position: "absolute",
    top: "14.5%",
    left: "33.7%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    alignItems: "center",
  },
};

class AddBoatModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boats: null,
    };
  }

  componentDidMount() {
    axios
      .get("/boats")
      .then((res) => {
        console.log(res.data);
        this.setState({
          boats: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { classes, visible } = this.props;

    let BoatCardMarkup = this.state.boats ? (
      this.state.boats.map((boat) => (
        <AddBoatCard key={boat.boatName} boat={boat} />
      ))
    ) : (
      <p>Loading...</p>
    );

    if (visible === true)
      return (
        <Paper elevation={3} className={classes.container}>
          {BoatCardMarkup}
        </Paper>
      );

    return null;
  }
}

export default withStyles(styles)(AddBoatModal);
