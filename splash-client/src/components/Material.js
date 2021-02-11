import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import TextField from "@material-ui/core/TextField";

const styles = {
  divForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkBox: {
    marginLeft: "0px",
    marginBottom: "5px",
  },
  numberBox: {
    marginRight: "0px",
    marginBottom: "5px",
  },
};

class Material extends Component {
  handleClick = (event) => {
    this.props.toggleSelection(this.props.material);
  };

  render() {
    const {
      material,
      isSelected,
      toggleSelection,
      onChange,
      classes,
    } = this.props;

    if (this.props.isSelected) {
      return (
        <div className={classes.divForm}>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={this.handleClick} />}
            label={material}
            labelPlacement="start"
            className={classes.checkBox}
          />
          <TextField
            id={material}
            name={material}
            label="Quantity"
            type="number"
            variant="outlined"
            onChange={onChange}
            className={classes.numberBox}
            size="small"
          />
        </div>
      );
    } else {
      return (
        <div className={classes.divForm}>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={this.handleClick} />}
            label={material}
            labelPlacement="start"
            className={classes.checkBox}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(Material);
