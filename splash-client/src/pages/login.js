import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from "axios";

//MUI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";


const styles = {
  form: {
    textAlign: "center"
  },
  title: {
    margin: "10px auto 10px auto"
  },
  email: {
    margin: "10px auto 10px auto"
  },
  password: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20
  }
}

class login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('/login', userData)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: true
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <Typography variant='h2' className={classes.title}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField id='email' name='email' type='email' label='Email' className={classes.email} value={this.state.email}
            onChange={this.handleChange} fullWidth
            helperText={errors.email} error={errors.email ? true : false}/>
          <TextField id='password' name='password' type='password' label='Password' className={classes.password} value={this.state.password}
            onChange={this.handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false}/>
          <Button type='submit' variant='contained' color='primary' className={classes.button}>
            login</Button>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);
