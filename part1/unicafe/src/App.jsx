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

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ counts }) => {
  const allCounts = counts.good + counts.neutral + counts.bad;
  const averageCounts = (counts.good - counts.bad) / allCounts;
  const positiveCounts = ((counts.good) / allCounts) * 100;

  const statistics = () => {
    if (allCounts > 0) {
      return (
        <table>
          <tbody>
            <StatisticLine name="good" value={counts.good} />
            <StatisticLine name="neutral" value={counts.neutral} />
            <StatisticLine name="bad" value={counts.bad} />
            <StatisticLine name="all" value={allCounts} />
            <StatisticLine name="average" value={averageCounts} />
            <StatisticLine name="positive" value={positiveCounts.toString() + '%'} />
          </tbody>
        </table>
      );
    } else {
      return <p>No feedback given</p>;
    }
  };

  return (
    <div>
      {statistics()}
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

  return (
    <>
      <Title name="give feedback" />
      <Button name="good" onClick={generateOnClick(good, setGood)} />
      <Button name="neutral" onClick={generateOnClick(neutral, setNeutral)} />
      <Button name="bad" onClick={generateOnClick(bad, setBad)} />
      <Title name="statistics" />
      <Statistics counts={{ good: good, neutral: neutral, bad: bad }} />
    </>
  );
};

export default App
