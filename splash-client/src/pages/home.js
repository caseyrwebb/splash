import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import UserCard from "../components/UserCard";
import SlipCard from "../components/SlipCard";
import Form from "../components/Form";
import Material from "../components/Material";
import Modal from "../components/Modal";
import ReportModal from "../components/ReportModal";
import AddBoatModal from "../components/AddBoatModal";

const styles = {
  containerModal: {
    filter: "blur(4px)",
  },
  slipContainer: {
    height: "84vh",
    overflow: "auto",
  },
  userContainer: {
    height: "84vh",
    overflow: "auto",
  },
  itemsContainer: {},
  fieldset: {
    paddingTop: "2em",
    paddingRight: "2em",
    paddingLeft: "2em",
    marginTop: "2em",
    marginLeft: "1em",
    width: "80%",
    border: "thin solid #81d4fa",
    borderRadius: "8px",
  },
};

class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boat: "",
      boats: null,
      checked: [],
      items: null,
      materials: null,
      slips: null,
      users: null,
      worker: "",
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

    axios
      .get("/items")
      .then((res) => {
        console.log(res.data);
        this.setState({
          materials: res.data,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("/users")
      .then((res) => {
        console.log(res.data);
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("/slips")
      .then((res) => {
        console.log(res.data);
        this.setState({
          slips: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  toggleSelection = (material) => {
    var index = this.state.checked.indexOf(material);
    var newSelection = this.state.checked.slice();

    // Friend is not currently selected.
    if (index === -1) {
      newSelection.push(material);

      // Friend is currently selected.
    } else {
      newSelection.splice(index, 1);
    }

    this.setState({
      checked: newSelection,
    });
    console.log(this.state);
  };

  isSelected(material) {
    return this.state.checked.indexOf(material) !== -1;
  }

  onNameChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  handleBoatChange = (event) => {
    this.setState({
      boat: event.target.value,
    });
    console.log(this.state);
  };

  handleWorkerChange = (event) => {
    this.setState({
      worker: event.target.value,
    });
    console.log(this.state);
  };

  handleBoatOpen = (event) => {
    this.setState({
      boatOpen: true,
    });
  };

  handleBoatClose = (event) => {
    this.setState({
      boatOpen: false,
    });
  };

  handleWorkerOpen = () => {
    this.setState({
      workerOpen: true,
    });
  };

  handleWorkerClose = () => {
    this.setState({
      workerOpen: false,
    });
  };

  onNumberChange = (event) => {
    this.setState({
      [event.target.name]: Number(event.target.value),
    });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let obj = this.state;

    let list = Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, value])
    );

    delete list.worker;
    delete list.boat;
    delete list.boats;
    delete list.users;
    delete list.items;
    delete list.materials;
    delete list.checked;
    delete list.slips;
    delete list.workerOpen;
    delete list.boatOpen;

    const itemsUsed = {
      items: list,
      boat: this.state.boat,
      worker: this.state.worker,
    };

    axios.post("/createItemsUsed", itemsUsed).then((res) => {
      console.log(res.data);
    });
    event.target.reset();
  };

  render() {
    const { classes } = this.props;

    let materialsMarkup = this.state.materials ? (
      this.state.materials.map((data, inx) => (
        <Material
          id={data.item}
          key={data.item}
          material={data.item}
          isSelected={this.isSelected(data.item)}
          toggleSelection={this.toggleSelection}
          onChange={this.onNumberChange}
        />
      ))
    ) : (
      <p>Loading...</p>
    );

    let UserCardMarkup = this.state.users ? (
      this.state.users.map((user) => (
        <UserCard key={user.userId} users={user} />
      ))
    ) : (
      <p>Loading...</p>
    );

    //Might give you troubles as number of boats increase. Try if slips and boats equal true.

    let SlipCardMarkup =
      this.state.boats && this.state.slips ? (
        this.state.slips.map((slip) => (
          <SlipCard
            key={slip.slipNumber}
            slip={slip}
            boats={this.state.boats}
          />
        ))
      ) : (
        <p>Loading...</p>
      );

    let containerStyle =
      this.props.modal || this.props.reportModal || this.props.boatModal
        ? classes.containerModal
        : classes.containerNoModal;

    return (
      <>
        <Modal visible={this.props.modal} />
        <ReportModal visible={this.props.reportModal} />
        <AddBoatModal visible={this.props.boatModal} />
        <Grid container direction="row" className={containerStyle}>
          <Grid item sm>
            <div className={classes.userContainer}>{UserCardMarkup}</div>
          </Grid>
          <Grid item sm>
            {this.state.users && this.state.slips ? (
              <div className={classes.itemsContainer}>
                <fieldset className={classes.fieldset}>
                  <Form
                    handleSubmit={this.handleSubmit}
                    boatTextFieldValue={this.state.boat}
                    onNameChange={this.onNameChange}
                    children={materialsMarkup}
                    workerOpen={this.state.workerOpen}
                    handleWorkerClose={this.handleWorkerClose}
                    handleWorkerOpen={this.handleWorkerOpen}
                    worker={this.state.worker}
                    handleWorkerChange={this.handleWorkerChange}
                    users={this.state.users}
                    slips={this.state.slips}
                    boatOpen={this.state.boatOpen}
                    handleBoatClose={this.handleBoatClose}
                    handleBoatOpen={this.handleBoatOpen}
                    boat={this.state.boat}
                    handleBoatChange={this.handleBoatChange}
                  />
                </fieldset>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Grid>
          <Grid item sm>
            <div className={classes.slipContainer}>{SlipCardMarkup}</div>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modalReducer,
  reportModal: state.reportModalReducer,
  boatModal: state.boatModalReducer,
});

export default connect(mapStateToProps)(withStyles(styles)(home));
