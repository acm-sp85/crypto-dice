import CurrencyPrice from './components/CurrencyPrice';
import './App.css';
import { useEffect, useState } from 'react';
import Results from './components/Results';
// added button from Antd library, at the moment is not really kicking in
// import styled, { css } from 'styled-components';
import styled from 'styled-components';
import { Line } from 'rc-progress';

const UP_TYPE = 'up';
const DOWN_TYPE = 'down';

// Added styled-components for the Results Container
const StyledResultsContainer = styled.div`
  margin-top: 45vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 3rem;
  font-size: 1.3rem;
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
  background-color: rgba(20, 30, 55, 0.9);
  opacity: 1;

  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 2.5rem;
  }
`;

const StyledDisclaimer = styled.div`
  margin-top: 45vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 3rem;
  font-size: 2rem;
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
  background-color: rgba(20, 30, 55, 0.9);
  opacity: 1;

  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 2.5rem;
  }
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
  const [credits, setCredits] = useState(3);
  const [disclaimer, setDisclaimer] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json')
      .then((response) => response.json())
      .then((data) => {
        if (data.country === 'US') {
          setDisclaimer(true);
        }
      });
  }, [currency]);

  // instantiating our currency formatter
  let formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currentPrice);

  // function to setReferencePrice when button onClick
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
      setCredits(credits - 1);
    } else if (referencePrice < formattedCurrency && betType === DOWN_TYPE) {
      setMessage('You loose!');
      setCredits(credits - 1);
    } else if (referencePrice === formattedCurrency) {
      setMessage("It's a tie, try again");
    } else {
      setMessage('You Win!! Bravo!!');
      setCredits(credits + 1);
    }
  };

  return (
    <div className="main-container">
      {disclaimer && (
        <StyledDisclaimer>
          <h3>Crypto-Dice runs on binance.com data</h3>
          <p>
            Due to regulatory restrictions in the US real-time data might not be
            available at this time.
          </p>
          <p>We recommend using a VPN or watching this demo video.</p>
          <button
            className="custom-button"
            onClick={() => {
              setDisclaimer(false);
            }}
          >
            Force app!
          </button>
          <button
            className="custom-button"
            onClick={() => {
              window.open(
                'https://vimeo.com/alexcontell/crypto-dice?share=copy',
                '_blank'
              );
            }}
          >
            Watch video
          </button>
        </StyledDisclaimer>
      )}
      <div className="card-content">
        <h1 className="title">CRYPTO-DICE</h1>
        <p className="tagline">A game to bet on crypto's value</p>
        <br />
        {/* Dropdown menu to select what currency we want to be playing with */}
        <select
          id="currency"
          value={currency}
          onChange={selectCurrency}
          className="custom-select"
        >
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          {/* <option value="DOGE">Dogecoin (DOGE)</option>
          <option value="ADA">Cardano (ADA)</option>
          <option value="ATOM">Atom (ATOM)</option>
          <option value="FTM">Fantom (FTM)</option> */}
        </select>
        {/* passing setLivePrice as a prop to our CurrencyPrice component */}
        <CurrencyPrice
          setCurrentPrice={setCurrentPrice}
          referencePrice={referencePrice}
          currency={currency}
        />

        <br />
        <div>
          {referencePrice ? (
            <>
              <p>Your reference price was set at {referencePrice}</p>
              <p>Now bet to see if the price is going up or down...</p>
              <br />
              <button
                data-test="bet-up-button"
                className="custom-button"
                disabled={betType === DOWN_TYPE}
                onClick={() => setBetType(UP_TYPE)}
              >
                🔺
              </button>
              <button
                data-test="bet-down-button"
                className="custom-button"
                disabled={betType === UP_TYPE}
                onClick={() => setBetType(DOWN_TYPE)}
              >
                🔻
              </button>
            </>
          ) : (
            <>
              <p>Start by selecting a reference price</p>
              <br />
              {credits > 0 ? (
                <button
                  data-test="set-reference-button"
                  data-testid="set-reference-button"
                  onClick={selectReference}
                  className="custom-button"
                >
                  SET REFERENCE
                </button>
              ) : (
                <button onClick={() => setCredits(3)} className="custom-button">
                  buy more credits
                </button>
              )}
            </>
          )}
        </div>
        <button
          data-test="check-bet-cta"
          data-testid="check-bet-cta"
          disabled={!betType}
          onClick={checkPrice}
          className="custom-button"
          style={{ marginTop: '15px' }}
        >
          check!
        </button>
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
              credits={credits}
              setCredits={setCredits}
            />
          </StyledResultsContainer>
        )}
        <br />
        <h3 data-test="credits-left-count">Credits left: {credits}</h3>
      </div>
      <div className="progress-bar-outside">
        <Line
          percent={credits * 10}
          strokeWidth={4.5}
          strokeColor={
            `${credits}` >= 3 ? 'rgba(6, 136, 6)' : 'rgba(188, 0, 0, 0.8)'
          }
          trailColor={
            credits >= 3 ? 'rgba(6, 136, 6, 0.1)' : 'rgba(188, 0, 0, 0.132)'
          }
          trailWidth={0}
        />
      </div>
    </div>
  );
}

export default App;
