import { useState } from 'react'

const Title = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>{name}</button>
  );
};

const FeedbackButtons = ({ onClickHandlers }) => {
  return (
    <div>
      <Button name="good" onClick={onClickHandlers.good} />
      <Button name="neutral" onClick={onClickHandlers.neutral} />
      <Button name="bad" onClick={onClickHandlers.bad} />
    </div>
  );
};

const Stat = ({ name, count }) => {
  return (
    <p>{name} {count}</p>
  );
};

const Stats = ({ counts }) => {
  return (
    <div>
      <Stat name="good" count={counts.good} />
      <Stat name="neutral" count={counts.neutral} />
      <Stat name="bad" count={counts.bad} />
    </div>
  );
};

const App = () => {
  let [ good, setGood ] = useState(0);
  let [ neutral, setNeutral ] = useState(0);
  let [bad, setBad ] = useState(0);

  const generateOnClick = (value, setter) => {
    return () => { setter(value + 1) };
  };

  const onClicks = {
    good: generateOnClick(good, setGood),
    neutral: generateOnClick(neutral, setNeutral),
    bad: generateOnClick(bad, setBad),
  };

  return (
    <>
      <Title name="give feedback" />
      <FeedbackButtons onClickHandlers={onClicks} />
      <Title name="statistics" />
      <Stats counts={{good: good, neutral: neutral, bad: bad}} />
    </>
  );
};

export default App
