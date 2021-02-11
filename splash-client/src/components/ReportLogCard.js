import React, { Component } from "react";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

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
  card: {
    border: "thin solid #fff",
    display: "flex",
    width: "100%",
    "&:hover": {
      border: "thin solid #81d4fa",
    },
    // marginLeft: -100
    backgroundColor: "black",
  },
  image: {
    minWidth: 125,
    objectFit: "cover",
  },
  content: {
    padding: 10,
    display: "flex",
    color: "white",

    // objectFit: 'cover'
  },
  boatContent: {
    display: "flex",
    width: "100%",
  },
  boatInfo: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  itemsInfo: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: "2em",
  },
  itemsMarkup: {
    display: "flex",
  },
  price: {
    color: "#43a047",
    textDecoration: "underline",
  },
  priceContainer: {
    backgroundColor: "yellow",
    paddingLeft: "1em",
    paddingRight: "1em",
    display: "flex",
    flexDirection: "column",
    marginLeft: "2em",
  },
  totalContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  },
  totalText: {
    backgroundColor: "yellow",
    paddingLeft: "1em",
    paddingRight: "1em",
  },
  total: {
    textDecoration: "underline",
  },
  totalAmount: {
    color: "#43a047",
  },
};

class ReportLogCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boatImage: "",
      boatLength: "",
      boatMake: "",
      boatYear: "",
      visible: false,
      itemsDischarged: [],
      total: 0,
    };
  }

  componentDidMount() {
    for (const item of this.props.boat) {
      this.setState({ boatMake: item.boatMake });
      this.setState({ boatLength: item.boatLength });
      this.setState({ boatImage: item.boatImage });
      this.setState({ boatYear: item.boatYear });
    }

    for (const item of this.props.items) {
      for (let [key, value] of Object.entries(this.props.logs.items)) {
        if (item.item === key)
          this.state.itemsDischarged.push([
            key,
            value,
            `${item.price * value}`,
          ]);
      }
    }
  }

  handleClick = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
    console.log(this.state);
  };

  render() {
    const { classes, logs, boat, items } = this.props;

    let boatClass = this.state.visible
      ? classes.boatCardVisible
      : classes.boatCardHidden;

    const ItemsMarkup = this.state.itemsDischarged.map((value) => {
      return (
        <div className={classes.itemsMarkup}>
          <Typography variant="body2">
            {value[0]} : {value[1].toString()}
          </Typography>
        </div>
      );
    });

    const PriceMarkup = this.state.itemsDischarged.map((value) => {
      return (
        <Typography variant="body2" className={classes.price}>
          ${value[2]}
        </Typography>
      );
    });

    const totalCost = (x = 0) => {
      for (const item of this.state.itemsDischarged) {
        x += Number(item[2]);
      }
      return x.toString();
    };

    const TotalMarkup = totalCost();

    return (
      <>
        <ButtonBase
          className={classes.button}
          disableTouchRipple
          onClick={this.handleClick}
        >
          <div className={classes.card}>
            <div className={classes.content}>
              <Typography variant="body2" style={{ marginRight: "0.25em" }}>
                {logs.createdAt}
              </Typography>
              <Typography variant="body2" style={{ marginRight: "0.25em" }}>
                {this.state.boatLength}ft
              </Typography>
              <Typography variant="body2" style={{ marginRight: "0.25em" }}>
                {this.state.boatMake}
              </Typography>
              <Typography variant="body2">"{logs.boat}"</Typography>
            </div>
          </div>
        </ButtonBase>
        <Card className={boatClass}>
          <CardMedia
            image={this.state.boatImage}
            title="Boat Image"
            className={classes.image}
          />
          <CardContent className={classes.boatContent}>
            <div className={classes.boatInfo}>
              <Typography variant="h6">"{logs.boat}"</Typography>
              <Typography variant="body1">
                {this.state.boatLength}ft {this.state.boatMake}
              </Typography>
              <Typography variant="body2">{this.state.boatYear}</Typography>
            </div>
            <div className={classes.itemsInfo}>{ItemsMarkup}</div>
            <div className={classes.priceContainer}>{PriceMarkup}</div>
            <div className={classes.totalContainer}>
              <div className={classes.totalText}>
                <Typography variant="body2" className={classes.total}>
                  Total:
                </Typography>
                <Typography variant="body2" className={classes.totalAmount}>
                  ${TotalMarkup}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(ReportLogCard);
