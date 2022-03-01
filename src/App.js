import { useEffect } from 'react';

import './App.css';

function App() {
  useEffect(() => {
    fetch('https://api.binance.us/api/v3/ticker/price?symbol=ETHUSD').then(
      // fetch('https://api.binance.us/api/v3/trades?symbol=ETHUSD').then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
          });
        }
      }
    );
  }, []);

  return (
    <div className="main-container">
      <h1>crypto-dice</h1>
      <p>The game to bet on your coin's next transaction</p>
    </div>
  );
}

export default App;
