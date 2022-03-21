import BitcoinPrice from './components/BitcoinPrice';
import './App.css';
import { useState } from 'react';

function App() {
  //adding pieces of state with the LivePrice of our currency, our Reference selection, our BetBehaviour and the NextPrice
  const [livePrice, setLivePrice] = useState(null);
  const [referencePrice, setReferencePrice] = useState(null);
  const [betType, setBetType] = useState(false);
  const [nextPrice, setNextPrice] = useState(null);

  // instantiating our currency formatter
  let formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(livePrice);

  // function to setReferencePrice when button onClick
  const selectReference = () => {
    setReferencePrice(formattedCurrency);
    console.log('reference: ' + formattedCurrency);
  };

  // our game logic. It is buggy at the time, it seems to be one step behind
  const checkingPrice = () => {
    setNextPrice(formattedCurrency);
    console.log(formattedCurrency);
    if (referencePrice > nextPrice && betType) {
      console.log('You loose');
    } else if (referencePrice < nextPrice && !betType) {
      console.log('You loose');
    } else if (referencePrice === nextPrice) {
      console.log("It's a tie, try again");
    } else {
      console.log('You win');
    }
  };
  return (
    <div className="main-container">
      <h1>crypto-dice</h1>
      <p>The game to bet on your coin's next transaction</p>
      <br />
      {/* passing setLivePrice as a prop to our BitcoinPrice component */}
      <BitcoinPrice setLivePrice={setLivePrice} />
      <br />
      <div>
        <button onClick={selectReference}>set reference</button>
        {/*  updating our state deppending on button pressed*/}
        <button onClick={() => setBetType(true)}>will go up</button>
        <button onClick={() => setBetType(false)}>will go down</button>
      </div>
      <button onClick={checkingPrice}>check!</button>
      <br />
    </div>
  );
}

export default App;
