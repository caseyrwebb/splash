import React, { Component } from "react";
import axios from "axios";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  button: {
    marginTop: "2em",
    width: "100%",
  },
  card: {
    display: "flex",
    width: "100%",
    "&:hover": {
      border: "thin solid #81d4fa",
    },
    // marginLeft: -100
  },
  image: {
    minWidth: 100,
    objectFit: "cover",
  },
  content: {
    padding: 25,
    display: "flex",
    alignItems: "center",

    // objectFit: 'cover'
  },
};

class AddBoatCard extends Component {
  handleAdd = () => {
    axios
      .post("/slip5Occupied")
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {
      classes,
      boat: { boatImage, boatLength, boatMake, boatName, boatYear },
    } = this.props;

    let mark = "'";

    return (
      <ButtonBase
        className={classes.button}
        disableTouchRipple
        onClick={this.handleAdd}
      >
        <Card className={classes.card}>
          <CardMedia
            image={boatImage}
            title="Boat Image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
            <Typography variant="h6" style={{ marginRight: "0.5em" }}>
              "{boatName}"
            </Typography>
            <Typography variant="body2">
              {boatLength}
              {mark} {boatMake}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(AddBoatCard);
