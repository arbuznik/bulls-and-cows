import heartImage from '../images/heart.fill.svg';
import skullImage from '../images/skull.svg';
import clapImage from '../images/clap.svg';

function GameStatus(props) {
  function getHearts() {
    if (props.guessAttempts) {
      return (
        Array(props.guessAttempts).fill(1).map((_, index) => {
          return <img key={`heart${index}`} src={heartImage} alt="Heart" className="heartImage" />
        })
      )
    }
    else {
      return <img src={skullImage} alt="Skull" className="heartImage" />
    }
  }

  if (props.playerWon) {
    return (
      <div className="gameStatus">
        <p className="statusText">Correctomundo!</p>
        <img src={clapImage} alt="Clap" className="heartImage" />
      </div>
    )
  } else {
    return (
      <div className="gameStatus">
        <p className="statusText">Attempts left:</p>
        <div className="heartsContainer">
          {getHearts()}
        </div>
      </div>
    )
  }
}

export default GameStatus;