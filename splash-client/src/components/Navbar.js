import React, { Component } from "react";
import Link from "react-router-dom/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useDispatch } from "react-redux";
import { toggleModal } from "../redux/actions";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <AppBar>
      <Toolbar>
        <ButtonBase component={Link} to="/" disableTouchRipple>
          <h1>Splash</h1>
        </ButtonBase>
        <div className="nav-container">
          <IconButton
            style={{ color: "white", left: "1220px" }}
            onClick={() => dispatch(toggleModal())}
          >
            <AddCircleOutlineIcon style={{ fontSize: 50 }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
