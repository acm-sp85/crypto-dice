import BitcoinPrice from './components/BitcoinPrice';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <h1>crypto-dice</h1>
      <p>The game to bet on your coin's next transaction</p>
      <br />
        <BitcoinPrice />
      <br />
    </div>
  );
}

export default App;
