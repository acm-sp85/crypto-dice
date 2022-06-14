import BitcoinPrice from './components/BitcoinPrice';
import './App.css';
import { useState } from 'react';
import Results from './components/Results';
// added Button from Antd library, at the moment is not really kicking in
import { Button } from 'antd';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';

const UP_TYPE = 'up';
const DOWN_TYPE = 'down';

// Added styled-components for the Results Container
const StyledResultsContainer = styled.div`
  margin-top: 45vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: fixed;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(31, 32, 41, 0.838);
  opacity: 1;
`;

function App() {
  //adding pieces of state with the currentPrice of our currency, our Reference selection, our BetBehaviour and the NextPrice
  const [currency, setCurrency] = useState('BTC');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [referencePrice, setReferencePrice] = useState(null);
  const [betType, setBetType] = useState(null);
  const [betPrice, setBetPrice] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState(null);

  // instantiating our currency formatter
  let formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currentPrice);

  // function to setReferencePrice when Button onClick
  const selectReference = () => {
    setReferencePrice(formattedCurrency);
    console.log('reference: ' + formattedCurrency);
  };

  // function to select t(he currency
  const selectCurrency = (e) => {
    console.log(e.target.value);
    setCurrency(e.target.value);
  };

  // once we check the price we activate our modal to show the results of our bet
  const checkPrice = () => {
    setShowResults(true);
    // We set the bet price in order to pass it to our modal and be able to display it at part of summary
    setBetPrice(formattedCurrency);
    if (referencePrice > formattedCurrency && betType === UP_TYPE) {
      setMessage('You loose!');
    } else if (referencePrice < formattedCurrency && betType === DOWN_TYPE) {
      setMessage('You loose!');
    } else if (referencePrice === formattedCurrency) {
      setMessage("It's a tie, try again");
    } else {
      setMessage('You Win!! Bravo!!');
    }
  };

  return (
    <div className="main-container">
      <h1>crypto-dice</h1>
      <p>The game to bet on your coin's next transaction</p>
      <br />
      {/* Dropdown menu to select what currency we want to be playing with */}
      <select id="currency" value={currency} onChange={selectCurrency}>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="DOGE">Dogecoin (DOGE)</option>
        <option value="SHIB">Shiba Inu (SHIB)</option>
      </select>
      {/* passing setLivePrice as a prop to our BitcoinPrice component */}
      <BitcoinPrice
        setCurrentPrice={setCurrentPrice}
        referencePrice={referencePrice}
      />
      {<p>{currency}</p>}
      <br />
      <div>
        {referencePrice ? (
          <>
            <p>Your reference price was set at {referencePrice}</p>
            <p>Now bet to see if the price is going up or down...</p>
            <br />
            <Button
              disabled={betType === DOWN_TYPE}
              onClick={() => setBetType(UP_TYPE)}
            >
              🔺
            </Button>
            <Button
              disabled={betType === UP_TYPE}
              onClick={() => setBetType(DOWN_TYPE)}
            >
              🔻
            </Button>
          </>
        ) : (
          <>
            <p>Start by selecting a reference price</p>
            <br />
            <Button onClick={selectReference}>set reference</Button>
          </>
        )}
      </div>
      <Button disabled={!betType} onClick={checkPrice}>
        check!
      </Button>
      <br />
      {showResults && (
        <StyledResultsContainer>
          {/* If we have results to show we render the Results component */}
          <Results
            message={message}
            setReferencePrice={setReferencePrice}
            referencePrice={referencePrice}
            betPrice={betPrice}
            setShowResults={setShowResults}
            setBetType={setBetType}
            betType={betType}
          />
        </StyledResultsContainer>
      )}
    </div>
  );
}

export default App;
