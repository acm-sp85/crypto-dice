import ConfettiExplosion from './ConfettiExplosion';

function Results({
  message,
  setReferencePrice,
  setShowResults,
  setBetType,
  referencePrice,
  betPrice,
  betType,
  credits,
  setCredits,
}) {
  const tryAgain = () => {
    setReferencePrice(null);
    setShowResults(false);
    setBetType(null);
  };

  const restartCredits = () => {
    setCredits(3);
    setReferencePrice(null);
    setShowResults(false);
    setBetType(null);
  };

  return (
    <div>
      {credits > 9 ? (
        <>
          <ConfettiExplosion />
          <h1>YOU WIN</h1>
          <button onClick={restartCredits}>Start Over</button>
        </>
      ) : (
        <div>
          <h1>{message}</h1>
          <p>Ref price: {referencePrice}</p>
          <p>Price at the time of the bet: {betPrice}</p>
          <p>You bet the price would go {betType}</p>
          <button
            data-test="try-again-cta"
            data-testid="try-again-cta"
            onClick={tryAgain}
            className="custom-button"
            style={{ marginTop: '20px' }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export default Results;
