const SearchMatches = ({matches, onClick}) => {
  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  const matchEntries = matches.map((elem) => {
    return <p key={elem}>{elem} <button onClick={() => onClick(elem)}>Show</button></p>;
  });

  return (
    <>
      {matchEntries}
    </>
  );
}

export default SearchMatches;
