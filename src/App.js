import { useEffect, useState } from 'react';

import './App.css';

function App() {
  let [coinbasePrice, setCoinbasePrice] = useState(null);
  let [binancePrice, setBinancePrice] = useState(null);
  useEffect(() => {
    fetch('https://api.coinbase.com/v2/prices/spot?currency=USD').then(
      // fetch('https://api.binance.us/api/v3/ticker/price?symbol=ETHUSD').then(
      // fetch('https://api.binance.us/api/v3/trades?symbol=ETHUSD').then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log('Bitcoin price on Coinbase: ' + data.data.amount);
            setCoinbasePrice(data.data.amount);
          });
        }
      }
    );

    fetch('https://api.binance.us/api/v3/ticker/price?symbol=BTCUSD').then(
      // fetch('https://api.binance.us/api/v3/trades?symbol=ETHUSD').then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log('Bitcoin price on Binance: ' + data.price);
            setBinancePrice(data.price);
          });
        }
      }
    );
  }, []);

  return (
    <div className="main-container">
      <h1>crypto-dice</h1>
      <p>The game to bet on your coin's next transaction</p>
      <br />
      {<p>Bitcoin price on Coinbase: {coinbasePrice}</p>}
      {<p>Bitcoin price on Binance: {binancePrice}</p>}
    </div>
  );
}

export default App;
