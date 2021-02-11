import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { AiFillCloseSquare } from "react-icons/ai";
import { IconContext } from "react-icons";

import ReportLogCard from "./ReportLogCard";

const styles = {
  container: {
    position: "absolute",
    top: "13%",
    left: "25%",
    zIndex: 1,
  },
  divContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    alignItems: "center",
  },
};

class ReportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boat: null,
      logs: null,
      items: null,
      itemsDischarged: [],
    };
  }

  componentDidMount() {
    const boatName = "Land Shark";

    axios
      .get(`/boat/${boatName}`)
      .then((res) => {
        this.setState({ boat: res.data.boat });
        this.setState({ logs: res.data.itemsUsed });
        console.log(this.state);
      })
      .catch((err) => console.log(err));

    axios
      .get("/items")
      .then((res) => {
        this.setState({ items: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleRemove = () => {
    axios
      .post("/slipOccupied")
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { classes, visible } = this.props;

    let BoatCardMarkup = this.state.boat ? (
      this.state.boat.map((boat) => <p>{boat.boatName}</p>)
    ) : (
      <p>Loading...</p>
    );

    let mark = "'";

    let LogCardMarkup =
      this.state.logs && this.state.items ? (
        this.state.logs.map((log) => (
          <ReportLogCard
            key={log.itemId}
            logs={log}
            boat={this.state.boat}
            items={this.state.items}
          />
        ))
      ) : (
        <p>Loading...</p>
      );

    if (visible === true) {
      if (this.state.boat !== null) {
        return (
          <Paper elevation={3} className={classes.container}>
            <div style={{ position: "absolute", zIndex: 1 }}>
              <ButtonBase onClick={this.props.report}>
                <IconContext.Provider
                  value={{
                    style: {
                      fontSize: "30px",
                      color: "grey",
                    },
                  }}
                >
                  <AiFillCloseSquare />
                </IconContext.Provider>
              </ButtonBase>
            </div>
            <div className={classes.divContainer}>
              <div style={{ display: "flex" }}>
                <img
                  src={this.state.boat[0].boatImage}
                  alt="Boat image"
                  style={{ width: "200px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    marginLeft: "180px",
                  }}
                >
                  <Typography variant="h4">
                    "{this.state.boat[0].boatName}"
                  </Typography>
                  <Typography variant="h6">
                    {this.state.boat[0].boatMake}{" "}
                    {this.state.boat[0].boatLength}
                    {mark}
                  </Typography>
                  <Typography variant="h6">
                    {this.state.boat[0].boatYear}
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: "2em" }}>
                    Owner: Richard Shelley
                  </Typography>
                </div>
              </div>
              <Typography variant="body1" style={{ marginTop: "2em" }}>
                Remove bottom paint(to gellcoat).
              </Typography>
              <Typography variant="body1">
                Primer (SeaHawk Tuff Stuff) x 2
              </Typography>
              <Typography variant="body1">Paint (SeaHawk Red) x 2</Typography>
              <Typography variant="body1">Full detail.</Typography>
              <Typography
                variant="body1"
                style={{
                  marginTop: "2em",
                  marginBottom: "1em",
                  backgroundColor: "yellow",
                }}
              >
                Total: $1,650
              </Typography>
              <div
                style={{ width: "700px", height: "200px", overflow: "auto" }}
              >
                {LogCardMarkup}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ButtonBase onClick={this.handleRemove}>
                <Typography
                  variant="body2"
                  style={{
                    textDecoration: "underline",
                    color: "#1e88e5",
                    marginRight: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Remove boat
                </Typography>
              </ButtonBase>
            </div>
          </Paper>
        );
      } else {
        return (
          <Paper elevation={3} className={classes.container}>
            <p>Bye</p>
          </Paper>
        );
      }
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  reportModal: state.reportModalReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    report: () => dispatch({ type: "TOGGLE_REPORT_MODAL" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReportModal));
