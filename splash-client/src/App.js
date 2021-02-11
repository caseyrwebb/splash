import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
//Components
import Navbar from "./components/Navbar";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

//MUI
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#b6ffff",
      main: "#81d4fa",
      dark: "#4ba3c7",
      contrastText: "#fff",
    },
    secondary: {
      light: "#b6ffff",
      main: "#81d4fa",
      dark: "#4ba3c7",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
