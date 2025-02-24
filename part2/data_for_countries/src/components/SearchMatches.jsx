const SearchMatches = ({matches}) => {
  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  const matchEntries = matches.map((elem) => {
    return <p key={elem}>{elem}</p>;
  });

  return (
    <>
      {matchEntries}
    </>
  );
}

export default SearchMatches;
