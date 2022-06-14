import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const StyledPriceContainer = styled.div`
  padding: 20px;
  max-width: 300px;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid green;
    `}
`;

const CurrencyPrice = ({ setCurrentPrice, referencePrice, currency }) => {
  const [currencyPrice, setCurrencyPrice] = useState(null);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    // initialize bitcoin web socket
    const bitcoinSocket = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@trade'
    );

    // set price on message
    bitcoinSocket.onmessage = function (event) {
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
    bitcoinSocket.addEventListener('error', handleSocketError);

    // close socket/remove listener when this component unmounts
    // to avoid memory leaks
    return () => {
      bitcoinSocket.removeEventListener('error', handleSocketError);
      bitcoinSocket.close();
    };
  }, []);

  // if no error or data, assume it's loading
  if (!socketError && !currencyPrice) {
    return <div style={{ color: 'white' }}>Loading ...</div>;
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
        style={{ color: 'white' }}
      >
        {referencePrice || formattedCurrency}
        {currency}
      </StyledPriceContainer>
      ;
    </div>
  );
};

export default CurrencyPrice;
