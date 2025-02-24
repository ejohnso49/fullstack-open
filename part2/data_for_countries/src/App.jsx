import { useState, useEffect } from 'react'

import Search from './components/Search';
import SearchMatches from './components/SearchMatches';
import CountryDetails from './components/CountryDetails';
import countriesApi from './services/countries';

const App = () => {
  const [searchString, setSearchString] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesApi.getAll().then(data =>
      setCountries(data)
    );
  }, []);

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value);
  }


  let matches;
  if (searchString !== '') {
    matches = countries
      .filter((country) => {
        return country.name.common.toLowerCase().includes(searchString);
      });
  } else {
    matches = [];
  }

  let countryInfo = undefined;
  if (matches.length == 1) {
    const info = matches[0]
    countryInfo = <CountryDetails country={info.name.common} capital={info.capital[0]} area={info.area} languages={Object.values(info.languages)} flag={info.flags.png} />;
  }

  return (
    <div>
      <Search onChange={handleSearchStringChange} />
      {countryInfo ? countryInfo : <SearchMatches matches={matches.map((country) => country.name.common)} />}
    </div>
  );
};

export default App;
