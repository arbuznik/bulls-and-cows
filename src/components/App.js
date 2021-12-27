
import '../blocks/App.css';
import GameBoard from './GameBoard';

function App() {
  return (
    <div className="App">
      <div className="App__header">Bulls & cows</div>
      <div className="App__container">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
