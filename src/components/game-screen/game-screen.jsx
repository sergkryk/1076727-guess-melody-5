import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {GameType} from '../../const';
import GameArtistScreen from '../game-artist-screen/game-artist-screen';
import GameGenreScreen from '../game-genre-screen/game-genre-screen';
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import Mistakes from "../mistakes/mistakes";
import artistQuestionProp from "../game-artist-screen/artist-question.prop";
import genreQuestionProp from "../game-genre-screen/genre-question.prop";

const GenreQuestionScreenWrapped = withAudioPlayer(GameGenreScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(GameArtistScreen);

const GameScreen = (props) => {
  const {questions, step, onUserAnswer, resetGame, mistakes} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    resetGame();
    return (
      <Redirect to="/" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes}/>
        </ArtistQuestionScreenWrapped>
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes}/>
        </GenreQuestionScreenWrapped>
      );
  }
  return <Redirect to="/" />;
};


GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([artistQuestionProp, genreQuestionProp]).isRequired
  ),
  mistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  mistakes: state.mistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
