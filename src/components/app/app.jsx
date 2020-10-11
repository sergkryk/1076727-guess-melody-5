import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import FailScreen from "../fail-screen/fail-screen";
import GameArtistScreen from "../game-artist-screen/game-artist-screen";
import GameGenreScreen from "../game-genre-screen/game-genre-screen";
import LoginScreen from "../login-screen/login-screen";
import SuccessScreen from "../success-screen/success-screen";
import GameScreen from "../game-screen/game-screen";

const App = (props) => {
  const {errorsCount, questions} = props;
  const [firstQuestion, secondQuestion] = questions;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact
          path="/"
          render={({history}) => (
            <WelcomeScreen
              onPlayButtonClick={() => history.push(`/game`)}
              errorsCount={errorsCount}
            />
          )}
        />
        <Route path="/login" exact>
          <LoginScreen />
        </Route>
        <Route path="/dev-genre" exact>
          <GameGenreScreen
            question={firstQuestion}
            onAnswer={() => {}}
          />
        </Route>
        <Route path="/dev-artist" exact>
          <GameArtistScreen
            question={secondQuestion}
            onAnswer={() => {}}
          />
        </Route>
        <Route path="/result" exact>
          <SuccessScreen />
        </Route>
        <Route path="/lose" exact>
          <FailScreen />
        </Route>
        <Route exact path="/game">
          <GameScreen
            errorsCount={errorsCount}
            questions={questions}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
