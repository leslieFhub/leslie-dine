import React from "react";
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timeLeft: 10,
      isGameOver: false,
    };
  }

  componentDidMount() {
    this.startGame();
  }

  startGame = () => {
    this.gameInterval = setInterval(() => {
      const { timeLeft } = this.state;
      if (timeLeft > 0) {
        this.setState((prevState) => ({
          timeLeft: prevState.timeLeft - 1,
        }));
      } else {
        this.endGame();
      }
    }, 1000);
  };

  endGame = () => {
    clearInterval(this.gameInterval);
    this.setState({ isGameOver: true });
  };

  handleButtonClick = () => {
    const { isGameOver } = this.state;
    if (!isGameOver) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    }
  };

  render() {
    const { score, timeLeft, isGameOver } = this.state;

    return (
      <div className="container game-container">
        <h2>Mini Game</h2>
        {!isGameOver ? (
          <div>
            <p>Score: {score}</p>
            <p>Time Left: {timeLeft} seconds</p>
            <button className="btn btn-primary" onClick={this.handleButtonClick}>
              Click Me!
            </button>
          </div>
        ) : (
          <div>
            <h3>Game Over!</h3>
            <p>Final Score: {score}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Game;
