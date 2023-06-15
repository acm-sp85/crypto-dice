import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const StyledPriceContainer = styled.div`
  padding: 10px;
  margin-top: 10px;
  max-width: 300px;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid green;
      border-radius: 2px;
    `}
`;

const CurrencyPrice = ({ setCurrentPrice, referencePrice, currency }) => {
  const [currencyPrice, setCurrencyPrice] = useState(null);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    // initialize currency web socket
    const currencySocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${currency.toLowerCase()}usdt@trade`
    );

    // set price on message
    currencySocket.onmessage = function (event) {
      let messageObject = JSON.parse(event.data);
      setCurrencyPrice(messageObject.p);
      // bubbling up the price to our App's state
      setCurrentPrice(messageObject.p);
    };

    // handle error state
    const handleSocketError = (event) => {
      if (event.message) {
        setSocketError(event.message);
      }
    };
    currencySocket.addEventListener('error', handleSocketError);

    // close socket/remove listener when this component unmounts
    // to avoid memory leaks
    return () => {
      currencySocket.removeEventListener('error', handleSocketError);
      currencySocket.close();
    };
  }, [currency]);

  // if no error or data, assume it's loading
  if (!socketError && !currencyPrice) {
    return (
      <div data-test="currency-loading-text" style={{ color: 'white' }}>
        Loading ...
      </div>
    );
  }

  if (socketError) {
    return <div style={{ color: 'white' }}>Error: {socketError}</div>;
  }

  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currencyPrice);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <StyledPriceContainer
        isSelected={!!referencePrice}
        style={{
          color: 'rgb(216, 195, 34)',
          fontFamily: 'VT323',
          fontSize: '3rem',
        }}
      >
        <span data-test="formatted-reference-price">
          {referencePrice || formattedCurrency}
        </span>
        -{currency}
      </StyledPriceContainer>
    </div>
  );
};

export default CurrencyPrice;
