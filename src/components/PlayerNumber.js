function PlayerNumber(props) {;
  return (
    <div className="playerNumber">
      {props.playerNumber.map((digit, index) => {
        return <p key={index} className={digit.matchType}>{digit.value}</p>
      })}
    </div>
  )
}

export default PlayerNumber;