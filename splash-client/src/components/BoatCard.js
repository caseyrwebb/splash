import React, { Component } from "react";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginTop: "2em",

    // marginLeft: -100
  },
  image: {},
  content: {
    padding: 25,
    // objectFit: 'cover'
  },
};

class BoatCard extends Component {
  render() {
    const {
      classes,
      boats: { boatLength, boatName, boatMake, slipNumber },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="body1">{boatMake}</Typography>
          <Typography variant="body1">{boatName}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(BoatCard);
