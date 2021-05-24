import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function getCountDown(end) {
  // Get today's date and time
  const countDownDate = new Date(end).getTime();
  if (!countDownDate) { return false; }
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  if (distance <= 0) {
    return false;
  }

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

const CountDown = ({ end }) => {
  if (!end) {
    return false;
  }
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    // subcribing the interval
    const interval = setInterval(() => {
      const output = getCountDown(end);
      if (!output) {
        // eslint-disable-next-line no-console
        console.error(`given end date(${end}) is not correct! or outdated`);

        // unsubcribing the interval if operation failed
        return clearInterval(interval);
      }
      return setTimeLeft(output);
    }, 1000);

    // unsubcribing the interval while signout
    return () => clearInterval(interval);
  }, [end]);

  if (!timeLeft) return <ul />;

  return (
    <ul className="react-countdown">
      <li>
        <p className="digit">{timeLeft.days}</p>
        <p className="text">days</p>
      </li>
      <li>
        <p className="digit">{timeLeft.hours}</p>
        <p className="text">hours</p>
      </li>
      <li>
        <p className="digit">{timeLeft.minutes}</p>
        <p className="text">min</p>
      </li>
      <li>
        <p className="digit">{timeLeft.seconds}</p>
        <p className="text">Sec</p>
      </li>
    </ul>
  );
};

CountDown.propTypes = {
  end: PropTypes.string.isRequired,
};

export default CountDown;
