import React, { Component } from "react";
import Link from "react-router-dom/Link";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

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

    // objectFit: 'cover'
  },
};

class UserCard extends Component {
  render() {
    const {
      classes,
      users: { userId, firstName, lastName, userImage, userName },
    } = this.props;
    return (
      <ButtonBase
        component={Link}
        to={`/users/${userName}`}
        style={styles.button}
        disableTouchRipple
      >
        <Card className={classes.card}>
          <CardMedia
            image={userImage}
            title="Profile Image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
            <Typography variant="h6" style={{ marginRight: "0.25em" }}>
              {firstName}
            </Typography>
            <Typography variant="h6">{lastName}</Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(UserCard);
