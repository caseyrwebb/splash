import React, { Component } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import LogCard from "../components/LogCard";

const styles = {
  container: {
    display: "flex",
  },
  image: {
    maxWidth: "170px",
    objectFit: "cover",
  },
  imageContainer: {
    marginTop: "4em",
    hieght: "170px",
    width: "170px",
    display: "flex",
    borderRadius: "50%",
    overflow: "hidden",
  },
  name: {
    marginTop: "1.5em",
  },
  schedule: {
    marginTop: "2em",
  },
  scheduleButton: {
    marginTop: "8.2em",
  },
  userInfo: {
    display: "flex",
    width: "35%",
    height: "90vh",
    alignItems: "center",
    flexDirection: "column",
  },
  userActivity: {
    backgroundColor: "#eceff1",
    display: "block",
    height: "90vh",
    overflow: "auto",
    width: "65%",
    alignItems: "center",
    flexDirection: "column",
  },
};

class user extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      logs: null,
      boats: null,
      items: null,
    };
  }

  componentDidMount() {
    const handle = this.props.match.params.handle;

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ user: res.data.user });
        this.setState({ logs: res.data.itemsUsed });
        console.log(this.state);
      })
      .catch((err) => console.log(err));

    axios
      .get("/boats")
      .then((res) => {
        this.setState({ boats: res.data });
      })
      .catch((err) => console.log(err));

    axios
      .get("/items")
      .then((res) => {
        this.setState({ items: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { classes } = this.props;

    let LogCardMarkup =
      this.state.logs && this.state.boats ? (
        this.state.logs.map((log) => (
          <LogCard
            key={log.itemId}
            logs={log}
            boats={this.state.boats}
            items={this.state.items}
          />
        ))
      ) : (
        <p>Loading...</p>
      );

    if (
      this.state.user !== null &&
      this.state.boats !== null &&
      this.state.items !== null
    )
      return (
        <div className={classes.container}>
          <div className={classes.userInfo}>
            <div className={classes.imageContainer}>
              <img
                src={this.state.user.imageUrl}
                alt="Profile Image"
                className={classes.image}
              />
            </div>
            <Typography variant="h5" color="primary" className={classes.name}>
              {this.state.user.firstName} {this.state.user.lastName}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.scheduleButton}
            >
              schedule
            </Button>
            <div className={classes.schedule}>
              <Calendar />
            </div>
          </div>
          <div className={classes.userActivity}>
            <h2
              style={{
                marginBottom: "2em",
                marginTop: "2em",
                marginLeft: "48%",
              }}
            >
              Log
            </h2>
            {LogCardMarkup}
          </div>
        </div>
      );

    return null;
  }
}

export default withStyles(styles)(user);
