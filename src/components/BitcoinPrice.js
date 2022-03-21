import React, { useEffect, useState } from 'react';

const BitcoinPrice = ({setLivePrice}) => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    // initialize bitcoin web socket
    const bitcoinSocket = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@trade'
    );

    // set price on message
    bitcoinSocket.onmessage = function (event) {
      let messageObject = JSON.parse(event.data);
      setBitcoinPrice(messageObject.p);
      // bubbling up the price to our App's state
      setLivePrice(messageObject.p);
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
  if (!socketError && !bitcoinPrice) {
    return <div style={{ color: 'white' }}>Loading ...</div>;
  }

  if (socketError) {
    return <div style={{ color: 'white' }}>Error: {socketError}</div>;
  }

  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(bitcoinPrice);

  return <div style={{ color: 'white' }}>{formattedCurrency}</div>;
};

export default BitcoinPrice;
