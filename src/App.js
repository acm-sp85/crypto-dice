import BitcoinPrice from './components/BitcoinPrice';
import './App.css';
import { useState } from 'react';

function App() {
  //adding a piece of state with the live price of our currency
  const [livePrice, setLivePrice] = useState(null);
  return (
    <div className="main-container">
      <h1>crypto-dice</h1>
      <p>The game to bet on your coin's next transaction</p>
      <br />
      {/* passing setLivePrice as a prop to our BitcoinPrice component */}
      <BitcoinPrice setLivePrice={setLivePrice} />
      <br />
      <div>
        <button>set reference</button>
        <button>will go up</button>
        <button>will go down</button>
      </div>
      <button>check!</button>
      <br />
    </div>
  );
}

export default App;
