import React, { Component } from "react";
import { GiSailboat } from "react-icons/gi";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "./Modal";

const styles = {
  button: {
    width: "100%",
  },
  boatCardHidden: {
    display: "none",
  },
  boatCardVisible: {
    display: "flex",
    width: "100%",
  },
  slipCard: {
    marginTop: "2em",
    backgroundColor: "black",
    "&:hover": {
      border: "thin solid #81d4fa",
    },
  },
  slipContent: {
    display: "flex",
    width: "100%",
  },
  boatContent: {
    display: "flex",
    width: "100%",
  },
  image: {
    minWidth: 100,
    minHiegth: 100,
    objectFit: "cover",
  },
  content: {
    padding: 25,

    // objectFit: 'cover'
  },
  slipText: {
    color: "white",
  },
  report: {
    alignItems: "flex-end",
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  addBoat: {
    alignItems: "flex-end",
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
};

class SlipCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boatImage: "",
      boatLength: "",
      boatMake: "",
      boatYear: "",
      visible: false,
      reportVisible: false,
    };
  }

  componentDidMount() {
    for (const item of this.props.boats) {
      if (item.boatName === this.props.slip.boatName) {
        this.setState({ boatMake: item.boatMake });
        this.setState({ boatLength: item.boatLength });
        this.setState({ boatImage: item.boatImage });
        this.setState({ boatYear: item.boatYear });
      }
    }
  }

  handleClick = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  handleReportClick = () => {
    this.state.reportVisible
      ? this.setState({ reportVisible: false })
      : this.setState({ reportVisible: true });
  };

  render() {
    const { classes, boats, slip } = this.props;

    let boatClass = this.state.visible
      ? classes.boatCardVisible
      : classes.boatCardHidden;

    let mark = "'";

    if (slip.occupied === true)
      return (
        <>
          <Card className={classes.slipCard}>
            <ButtonBase
              className={classes.button}
              disableTouchRipple
              onClick={this.handleClick}
            >
              <CardContent className={classes.slipContent}>
                <Typography variant="h6" className={classes.slipText}>
                  Slip {slip.slipNumber}
                </Typography>
                <IconContext.Provider
                  value={{
                    style: {
                      fontSize: "30px",
                      color: "#76ff03",
                      marginLeft: "80%",
                    },
                  }}
                >
                  <GiSailboat />
                </IconContext.Provider>
              </CardContent>
            </ButtonBase>
          </Card>
          <Card className={boatClass}>
            <CardMedia
              image={this.state.boatImage}
              title="Boat Image"
              className={classes.image}
            />
            <CardContent className={classes.boatContent}>
              <div className={classes.details}>
                <Typography variant="h6" style={{ marginBottom: "0.1em" }}>
                  Slip {slip.slipNumber}
                </Typography>
                <Typography variant="body2">
                  {this.state.boatLength}
                  {mark} {this.state.boatMake}
                </Typography>
                <Typography variant="body2">"{slip.boatName}"</Typography>
              </div>
              <div className={classes.report}>
                <ButtonBase onClick={this.props.report}>
                  <Typography
                    variant="body2"
                    style={{ textDecoration: "underline", color: "#1e88e5" }}
                  >
                    View Report
                  </Typography>
                </ButtonBase>
              </div>
            </CardContent>
          </Card>
        </>
      );

    return (
      <>
        <Card className={classes.slipCard}>
          <ButtonBase
            className={classes.button}
            disableTouchRipple
            onClick={this.handleClick}
          >
            <CardContent className={classes.slipContent}>
              <Typography variant="h6" className={classes.slipText}>
                Slip {slip.slipNumber}
              </Typography>
              <IconContext.Provider
                value={{
                  style: {
                    fontSize: "30px",
                    color: "#d50000",
                    marginLeft: "80%",
                  },
                }}
              >
                <GiSailboat />
              </IconContext.Provider>
            </CardContent>
          </ButtonBase>
        </Card>
        <Card className={boatClass}>
          <CardContent className={classes.boatContent}>
            <Typography variant="body1">
              This slip is currently empty
            </Typography>
            <div className={classes.addBoat}>
              <ButtonBase onClick={this.props.addBoat}>
                <Typography
                  variant="body2"
                  style={{
                    textDecoration: "underline",
                    color: "#1e88e5",
                  }}
                >
                  Add Boat
                </Typography>
              </ButtonBase>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  reportModal: state.reportModalReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    report: () => dispatch({ type: "TOGGLE_REPORT_MODAL" }),
    addBoat: () => dispatch({ type: "TOGGLE_BOAT_MODAL" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SlipCard));
