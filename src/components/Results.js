function Results({
  message,
  setReferencePrice,
  setShowResults,
  setBetType,
  referencePrice,
  betPrice,
  betType,
}) {
  const tryAgain = () => {
    setReferencePrice(null);
    setShowResults(false);
    setBetType(null);
  };
  return (
    <div>
      <h1>{message}</h1>
      <p>Ref price: {referencePrice}</p>
      <p>Price at the time of the bet: {betPrice}</p>
      <p>You bet the price would go {betType}</p>
      <button onClick={tryAgain}>Try again</button>
    </div>
  );
}

export default Results;
