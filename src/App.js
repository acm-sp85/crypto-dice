import { useEffect, useState } from 'react';

import './App.css';

function App() {
  let [bitcoinPrice, setBitcoinPrice] = useState(null);
  let bitcoinSocket = new WebSocket(
    'wss://stream.binance.com:9443/ws/btcusdt@trade'
  );

  bitcoinSocket.onmessage = function (event) {
    console.log(event.data);
    let messageObject = JSON.parse(event.data);
    setBitcoinPrice(messageObject.p);
  };

  return (
    <div className="main-container">
      <h1>crypto-dice</h1>
      <p>The game to bet on your coin's next transaction</p>
      <br />
      {<p>Bitcoin: ${parseFloat(bitcoinPrice).toFixed(2)}</p>}
      <br />
    </div>
  );
}

export default App;
