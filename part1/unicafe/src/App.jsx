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

const Stat = ({ name, value }) => {
  return (
    <p>{name} {value}</p>
  );
};

const Statistics = ({ counts }) => {
  const allCounts = counts.good + counts.neutral + counts.bad;
  const averageCounts = (counts.good - counts.bad) / allCounts;
  const positiveCounts = ((counts.good) / allCounts) * 100;

  return (
    <div>
      <Stat name="good" value={counts.good} />
      <Stat name="neutral" value={counts.neutral} />
      <Stat name="bad" value={counts.bad} />
      <Stat name="all" value={allCounts} />
      <Stat name="average" value={averageCounts} />
      <Stat name="positive" value={positiveCounts.toString() + '%'} />
    </div>
  );
};

const App = () => {
  let [good, setGood] = useState(0);
  let [neutral, setNeutral] = useState(0);
  let [bad, setBad] = useState(0);

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
      <Statistics counts={{ good: good, neutral: neutral, bad: bad }} />
    </>
  );
};

export default App
