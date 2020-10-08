import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

// pages //
import WelcomeScreen from "../welcome-screen/welcome-screen";
import FailScreen from "../fail-screen/fail-screen";
import GameArtistScreen from "../game-artist-screen/game-artist-screen";
import GameGenreScreen from "../game-genre-screen/game-genre-screen";
import LoginScreen from "../login-screen/login-screen";
import SuccessScreen from "../success-screen/success-screen";

const App = (props) => {
  const {errorsCount} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <WelcomeScreen errorsCount={errorsCount} />
        </Route>
        <Route path="/signin" exact>
          <LoginScreen />
        </Route>
        <Route path="/genre" exact>
          <GameGenreScreen />
        </Route>
        <Route path="/artist" exact>
          <GameArtistScreen />
        </Route>
        <Route path="/success" exact>
          <SuccessScreen />
        </Route>
        <Route path="/fail" exact>
          <FailScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired
};

export default App;
